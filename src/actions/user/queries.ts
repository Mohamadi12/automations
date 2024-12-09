"use server";

import { client } from "@/lib/prisma";

export const findUser = async (clerkId: string) => {
  return await client.user.findUnique({
    where: {
      clerkId,
    },
    include: {
      subscription: true,
      integrations: {
        select: {
          id: true,
          token: true,
          expiresAt: true,
          name: true,
        },
      },
    },
  });
};
// La fonction findUser est une fonction asynchrone utilisée pour rechercher un utilisateur spécifique dans une base de données. Voici ce que vous devez savoir :
// Paramètres :
// clerkId : Identifiant unique de l'utilisateur fourni par Clerk.
// Fonctionnement :
// Recherche de l'Utilisateur :
// La fonction utilise client.user.findUnique pour rechercher un utilisateur unique par son clerkId.
// where: { clerkId } : Filtre la recherche par l'identifiant unique de l'utilisateur.
// include : Inclut des relations associées à l'utilisateur :
// subscription : Inclut l'abonnement de l'utilisateur.
// integrations : Inclut les intégrations de l'utilisateur, avec des champs spécifiques sélectionnés (id, token, expiresAt, name).
// Retour :
// La fonction retourne le résultat de la recherche, qui est l'utilisateur trouvé avec les relations incluses.

export const createUser = async (
  clerkId: string,
  firstname: string,
  lastname: string,
  email: string
) => {
  return await client.user.create({
    data: {
      clerkId,
      firstname,
      lastname,
      email,
      subscription: {
        create: {},
      },
    },
    select: {
      firstname: true,
      lastname: true,
    },
  });
};
// La fonction createUser est une fonction asynchrone utilisée pour créer un nouvel utilisateur dans une base de données. Voici ce que vous devez savoir :
// Paramètres :
// clerkId : Identifiant unique de l'utilisateur fourni par Clerk.
// firstname : Prénom de l'utilisateur.
// lastname : Nom de famille de l'utilisateur.
// email : Adresse e-mail de l'utilisateur.
// Fonctionnement :
// Création de l'Utilisateur :
// La fonction utilise client.user.create pour créer un nouvel utilisateur dans la base de données.
// data : Contient les données de l'utilisateur à créer, y compris clerkId, firstname, lastname, email, et une sous-ressource subscription vide pour créer un abonnement par défaut.
// select : Spécifie les champs à retourner après la création, ici firstname et lastname.
// Retour :
// La fonction retourne le résultat de l'opération de création, qui est l'utilisateur créé avec les champs firstname et lastname.

export const updateSubscription = async (
  clerkId: string,
  props: { customerId?: string; plan?: "PRO" | "FREE" }
) => {
  return await client.user.update({
    where: {
      clerkId,
    },
    data: {
      subscription: {
        update: {
          data: {
            ...props,
          },
        },
      },
    },
  });
};
// La fonction updateSubscription est une fonction asynchrone utilisée pour mettre à jour l'abonnement d'un utilisateur dans une base de données. Voici ce que vous devez savoir :
// Paramètres :
// clerkId : Identifiant unique de l'utilisateur.
// props : Un objet contenant les propriétés à mettre à jour, y compris customerId (optionnel) et plan (optionnel, avec les valeurs possibles 'PRO' ou 'FREE').
// Fonctionnement :
// Mise à Jour de l'Utilisateur :
// La fonction utilise client.user.update pour mettre à jour l'utilisateur dans la base de données.
// where: { clerkId } : Filtre la mise à jour par l'identifiant unique de l'utilisateur.
// data : Contient les données de l'abonnement à mettre à jour, en utilisant update pour mettre à jour les propriétés spécifiées.
// Retour :
// La fonction retourne le résultat de l'opération de mise à jour, qui est l'utilisateur mis à jour avec les nouvelles propriétés d'abonnement.
