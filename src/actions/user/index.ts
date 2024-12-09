"use server";

import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { createUser, findUser, updateSubscription } from "./queries";
import { refreshToken } from "@/lib/fetch";
import { updateIntegration } from "../integrations/queries";
import { stripe } from "@/lib/stripe";

export const onCurrentUser = async () => {
  const user = await currentUser(); 

  if (!user) return redirect("/sing-in"); 
  return user; 
};
// La fonction onCurrentUser est une fonction asynchrone utilisée pour obtenir l'utilisateur actuellement connecté. Voici ce que vous devez savoir :
// Fonctionnement :
// Récupération de l'Utilisateur Actuel :
// La fonction utilise currentUser() pour récupérer l'utilisateur actuellement connecté.
// Redirection :
// Si aucun utilisateur n'est connecté (!user), la fonction redirige l'utilisateur vers la page de connexion ("/sing-in").
// Retour :
// Si un utilisateur est connecté, la fonction retourne l'utilisateur.
// Retour :
// La fonction retourne l'utilisateur si connecté, sinon elle redirige vers la page de connexion.



export const onBoardUser = async () => {
  const user = await onCurrentUser(); 
  try {
    const found = await findUser(user.id);
    if (found) {
      if (found.integrations.length > 0) {
        const today = new Date(); 
        const time_left =
          found.integrations[0].expiresAt?.getTime()! - today.getTime(); 

        const days = Math.round(time_left / (1000 * 3600 * 24)); 
        if (days < 5) {
          console.log("refresh");

          const refresh = await refreshToken(found.integrations[0].token); 

          const today = new Date(); 
          const expire_date = today.setDate(today.getDate() + 60); 

          const update_token = await updateIntegration(
            refresh.access_token,
            new Date(expire_date),
            found.integrations[0].id
          );
          if (!update_token) {
            console.log("Update token failed");
          }
        }
      }

      return {
        status: 200,
        data: {
          firstname: found.firstname,
          lastname: found.lastname,
        },
      };
    }
    const created = await createUser(
      user.id,
      user.firstName!,
      user.lastName!,
      user.emailAddresses[0].emailAddress
    );
    return { status: 201, data: created }; 
  } catch (error) {
    console.log(error);
    return { status: 500 };
  }
};
// La fonction onBoardUser est une fonction asynchrone utilisée pour intégrer un utilisateur dans l'application. Voici ce que vous devez savoir :
// Fonctionnement :
// Récupération de l'Utilisateur Actuel :
// La fonction commence par appeler onCurrentUser() pour obtenir l'utilisateur actuel.
// Recherche de l'Utilisateur :
// Elle utilise findUser(user.id) pour rechercher l'utilisateur dans la base de données.
// Gestion des Intégrations :
// Si l'utilisateur est trouvé et a des intégrations, elle vérifie si le token d'intégration expire dans moins de 5 jours.
// Si le token expire bientôt, elle utilise refreshToken(found.integrations[0].token) pour rafraîchir le token.
// Elle met à jour le token d'intégration avec la nouvelle date d'expiration en utilisant updateIntegration.
// Création de l'Utilisateur :
// Si l'utilisateur n'est pas trouvé, elle crée un nouvel utilisateur en utilisant createUser.
// Gestion des Erreurs :
// En cas d'erreur lors de la recherche, de la mise à jour ou de la création de l'utilisateur, elle retourne un objet avec un statut 500.
// Retour :
// La fonction retourne un objet avec un statut HTTP (200, 201, ou 500) et éventuellement les données de l'utilisateur.


export const onUserInfo = async () => {
  const user = await onCurrentUser(); 
  try {
    const profile = await findUser(user.id); 
    if (profile) return { status: 200, data: profile };

    return { status: 404 }; 
  } catch (error) {
    return { status: 500 };
  }
};
// La fonction onUserInfo est une fonction asynchrone utilisée pour récupérer les informations d'un utilisateur. Voici ce que vous devez savoir :
// Fonctionnement :
// Vérification de l'Utilisateur Actuel :
// La fonction commence par appeler onCurrentUser() pour obtenir l'utilisateur actuel.
// Recherche de l'Utilisateur :
// Elle utilise findUser(user.id) pour rechercher l'utilisateur dans la base de données.
// Si l'utilisateur est trouvé, elle retourne un objet avec un statut 200 et les données de l'utilisateur.
// Si l'utilisateur n'est pas trouvé, elle retourne un objet avec un statut 404.
// Gestion des Erreurs :
// En cas d'erreur lors de la recherche, elle retourne un objet avec un statut 500.
// Retour :
// La fonction retourne un objet avec un statut HTTP (200, 404, ou 500) et éventuellement les données de l'utilisateur.


export const onSubscribe = async (session_id: string) => {
  const user = await onCurrentUser()
  try {
    const session = await stripe.checkout.sessions.retrieve(session_id)
    if (session) {
      const subscribed = await updateSubscription(user.id, {
        customerId: session.customer as string,
        plan: 'PRO',
      })

      if (subscribed) return { status: 200 }
      return { status: 401 }
    }
    return { status: 404 }
  } catch (error) {
    return { status: 500 }
  }
}
// La fonction onSubscribe est une fonction asynchrone utilisée pour gérer l'abonnement d'un utilisateur à un plan spécifique via Stripe. Voici ce que vous devez savoir :
// Paramètres :
// session_id : Identifiant unique de la session de paiement Stripe.
// Fonctionnement :
// Vérification de l'Utilisateur Actuel :
// La fonction commence par appeler onCurrentUser() pour obtenir l'utilisateur actuel.
// Récupération de la Session Stripe :
// Elle utilise stripe.checkout.sessions.retrieve(session_id) pour récupérer les détails de la session de paiement Stripe.
// Mise à Jour de l'Abonnement :
// Si la session est récupérée avec succès, elle utilise updateSubscription(user.id, { customerId: session.customer as string, plan: 'PRO' }) pour mettre à jour l'abonnement de l'utilisateur.
// Si la mise à jour réussit, elle retourne un objet avec un statut 200.
// Si la mise à jour échoue, elle retourne un objet avec un statut 401.
// Gestion des Erreurs :
// Si la session n'est pas trouvée, elle retourne un objet avec un statut 404.
// En cas d'erreur lors de la récupération de la session ou de la mise à jour de l'abonnement, elle retourne un objet avec un statut 500.
// Retour :
// La fonction retourne un objet avec un statut HTTP (200, 401, 404, ou 500).