"use server";

import { client } from "@/lib/prisma";

export const updateIntegration = async (
  token: string,
  expire: Date,
  id: string
) => {
  return await client.integrations.update({
    where: { id },
    data: {
      token,
      expiresAt: expire,
    },
  });
};
// La fonction updateIntegration est une fonction asynchrone utilisée pour mettre à jour les informations d'une intégration spécifique dans une base de données. Voici ce que vous devez savoir :
// Paramètres :
// token : Nouveau token d'intégration.
// expire : Nouvelle date d'expiration du token.
// id : Identifiant unique de l'intégration à mettre à jour.
// Fonctionnement :
// Mise à Jour de l'Intégration :
// La fonction utilise client.integrations.update pour mettre à jour l'intégration dans la base de données.
// where: { id } : Filtre la mise à jour par l'identifiant unique de l'intégration.
// data : Contient les nouvelles données de l'intégration, y compris le nouveau token (token) et la nouvelle date d'expiration (expiresAt).
// Retour :
// La fonction retourne le résultat de l'opération de mise à jour, qui est l'intégration mise à jour avec les nouvelles informations.

export const getIntegration = async (clerkId: string) => {
  return await client.user.findUnique({
    where: {
      clerkId,
    },
    select: {
      integrations: {
        where: {
          name: "INSTAGRAM",
        },
      },
    },
  });
};
// Objectif :
// Cette fonction permet de récupérer les intégrations Instagram d'un utilisateur spécifique en fonction de son clerkId.
// Paramètres :
// clerkId (string) : L'ID unique de l'utilisateur (provenant de Clerk, un service d'authentification).
// Action :
// Recherche de l'utilisateur :
// La fonction utilise un client (probablement Prisma) pour rechercher un utilisateur unique (findUnique) en fonction de son clerkId.
// Sélection des intégrations Instagram :
// Si l'utilisateur est trouvé, la fonction sélectionne ses intégrations (integrations) où le nom de l'intégration est INSTAGRAM.
// Retour :
// La fonction retourne les intégrations Instagram de l'utilisateur si elles existent.

export const createIntegration = async (
  clerkId: string,
  token: string,
  expire: Date,
  igId?: string
) => {
  return await client.user.update({
    where: {
      clerkId,
    },
    data: {
      integrations: {
        create: {
          token,
          expiresAt: expire,
          instagramId: igId,
        },
      },
    },
    select: {
      firstname: true,
      lastname: true,
    },
  });
};
// Objectif :
// Cette fonction permet de créer une nouvelle intégration Instagram pour un utilisateur spécifique en fonction de son clerkId.
// Paramètres :
// clerkId (string) : L'ID unique de l'utilisateur (provenant de Clerk, un service d'authentification).
// token (string) : Le jeton d'accès pour l'intégration Instagram.
// expire (Date) : La date d'expiration du jeton d'accès.
// igId (string, optionnel) : L'ID Instagram de l'utilisateur (optionnel).
// Action :
// Mise à jour de l'utilisateur :
// La fonction utilise un client (probablement Prisma) pour mettre à jour un utilisateur existant (update) en fonction de son clerkId.
// Création de l'intégration Instagram :
// Si l'utilisateur est trouvé, la fonction crée une nouvelle intégration Instagram dans la liste des intégrations de l'utilisateur.
// Les données de l'intégration incluent :
// token : Le jeton d'accès.
// expiresAt : La date d'expiration du jeton.
// instagramId : L'ID Instagram de l'utilisateur (optionnel).
// Sélection des informations de l'utilisateur :
// La fonction sélectionne le prénom (firstname) et le nom (lastname) de l'utilisateur après la mise à jour.
// Retour :
// La fonction retourne les informations de l'utilisateur (prénom et nom) après la création de l'intégration Instagram.
