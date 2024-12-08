"use server";

import { client } from "@/lib/prisma";

//La fonction createAutomation met à jour un utilisateur dans la base
//de données pour créer une nouvelle "automation" associée à cet utilisateur.
//Si un id est fourni, il est inclus dans les données de la nouvelle "automation".

export const createAutomation = async (clerkId: string, id?: string) => {
  return await client.user.update({
    where: {
      clerkId,
    },
    data: {
      automations: {
        create: {
          ...(id && { id }),
        },
      },
    },
  });
};

export const getAutomations = async (clerkId: string) => {
  // Requête à la base de données
  return await client.user.findUnique({
    where: {
      clerkId, //La recherche est filtrée sur la base du clerkId passé à la fonction.
    },
    select: {
      //select permet de spécifier exactement quelles données doivent être récupérées :
      automations: {
        orderBy: {
          createdAt: "asc",
        },
        include: {
          keywords: true,
          listener: true,
        },
      },
    },
  });
};

export const findAutomation = async (id: string) => {
  return await client.automation.findUnique({
    where: {
      id,
    },
    include: {
      keywords: true,
      trigger: true,
      posts: true,
      listener: true,
      User: {
        select: {
          subscription: true,
          integrations: true,
        },
      },
    },
  })
}

// La fonction findAutomation est une fonction asynchrone utilisée pour récupérer une automatisation spécifique à partir d'une base de données. Voici ce que vous devez savoir :
// Paramètre :
// id : Identifiant unique de l'automatisation à rechercher.
// Fonctionnement :
// Requête de Base de Données :
// La fonction utilise client.automation.findUnique pour rechercher une automatisation unique par son identifiant.
// where: { id } : Filtre la recherche par l'identifiant fourni.
// include : Inclut des relations associées à l'automatisation :
// keywords : Les mots-clés associés.
// trigger : Le déclencheur associé.
// posts : Les publications associées.
// listener : Le listener associé.
// User : L'utilisateur associé, avec des champs spécifiques sélectionnés (subscription et integrations).
// Retour :
// La fonction retourne l'automatisation trouvée avec toutes les relations incluses.