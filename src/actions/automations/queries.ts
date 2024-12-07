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
