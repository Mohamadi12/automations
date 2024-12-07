"use server";

import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { createUser, findUser } from "./queries";
import { refreshToken } from "@/lib/fetch";
import { updateIntegration } from "../integrations/queries";

export const onCurrentUser = async () => {
  const user = await currentUser(); //Récupère les informations de l'utilisateur actuel via Clerk.

  if (!user) return redirect("/sing-in"); //Redirige vers la page de connexion si aucun utilisateur n'est connecté.
  return user; //Retourne les informations de l'utilisateur connecté.
};

export const onBoardUser = async () => {
  const user = await onCurrentUser(); //Appelle onCurrentUser pour obtenir l'utilisateur actuellement connecté.
  try {
    const found = await findUser(user.id); //Cherche l'utilisateur dans la base de données en utilisant son id.
    if (found) {
      //Vérifie si l'utilisateur existe dans la base de données.
      if (found.integrations.length > 0) {
        //Vérifie si l'utilisateur a des intégrations liées.
        const today = new Date(); //Crée un objet Date représentant la date actuelle.
        const time_left =
          found.integrations[0].expiresAt?.getTime()! - today.getTime(); //Calcule le temps restant avant l'expiration de la première intégration.

        const days = Math.round(time_left / (1000 * 3600 * 24)); //Convertit le temps restant en jours.
        if (days < 5) {
          //Vérifie si l'intégration expire dans moins de 5 jours.
          console.log("refresh");

          const refresh = await refreshToken(found.integrations[0].token); //Demande un nouveau jeton pour l'intégration.

          const today = new Date(); //Recharge la date actuelle.
          const expire_date = today.setDate(today.getDate() + 60); //Calcule la nouvelle date d'expiration en ajoutant 60 jours.

          const update_token = await updateIntegration(
            //Met à jour l'intégration avec le nouveau jeton et la nouvelle date d'expiration.
            refresh.access_token,
            new Date(expire_date),
            found.integrations[0].id
          );
          if (!update_token) {
            //Vérifie si la mise à jour du jeton a échoué.
            console.log("Update token failed");
          }
        }
      }

      return {
        //Retourne les noms de l'utilisateur.
        status: 200,
        data: {
          firstname: found.firstname,
          lastname: found.lastname,
        },
      };
    }
    const created = await createUser(
      user.id,
      user.firstName!, //Si l'utilisateur n'existe pas, crée un nouvel utilisateur dans la base de données avec ses informations.
      user.lastName!,
      user.emailAddresses[0].emailAddress
    );
    return { status: 201, data: created }; //Retourne un statut 201 et les données de l'utilisateur créé.
  } catch (error) {
    console.log(error);
    return { status: 500 };
  }
};

export const onUserInfo = async () => {
  const user = await onCurrentUser(); //renvoie l'utilisateur actuellement connecté
  try {
    const profile = await findUser(user.id); //Cette fonction recherche le profil correspondant dans la base de données.
    if (profile) return { status: 200, data: profile }; //Si un profil est trouvé

    return { status: 404 }; //Si on a pas trouvé
  } catch (error) {
    return { status: 500 };
  }
};
