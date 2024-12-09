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
  });
};

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

export const updateAutomation = async (
  id: string,
  update: {
    name?: string;
    active?: boolean;
  }
) => {
  return await client.automation.update({
    where: { id },
    data: {
      name: update.name,
      active: update.active,
    },
  });
};
// Mise à Jour de l'Automatisation : Utilise une requête de base de données pour mettre à jour les propriétés name et active d'une automatisation spécifique.
// Filtrage par ID : Utilise l'identifiant unique de l'automatisation pour cibler la mise à jour.
// Retour : Retourne l'automatisation mise à jour.

export const addListener = async (
  automationId: string,
  listener: "SMARTAI" | "MESSAGE",
  prompt: string,
  reply?: string
) => {
  return await client.automation.update({
    where: {
      id: automationId,
    },
    data: {
      listener: {
        create: {
          listener,
          prompt,
          commentReply: reply,
        },
      },
    },
  });
};
// La fonction addListener est une fonction asynchrone utilisée pour ajouter un listener à une automatisation spécifique dans une base de données. Voici ce que vous devez savoir :
// Paramètres :
// automationId : Identifiant unique de l'automatisation à laquelle ajouter le listener.
// listener : Type de listener ('SMARTAI' ou 'MESSAGE').
// prompt : Texte du prompt associé au listener.
// reply (optionnel) : Texte de la réponse associée au listener.
// Fonctionnement :
// Mise à Jour de l'Automatisation :
// La fonction utilise client.automation.update pour mettre à jour l'automatisation dans la base de données.
// where: { id: automationId } : Filtre la mise à jour par l'identifiant unique de l'automatisation.
// data : Contient les données du listener à créer, incluant le type de listener, le prompt, et la réponse.
// Retour :
// La fonction retourne le résultat de l'opération de mise à jour, qui est l'automatisation mise à jour avec le nouveau listener.

// La fonction addKeyWord est une fonction asynchrone utilisée pour ajouter un mot-clé à une
// automatisation spécifique dans une base de données
export const addKeyWord = async (automationId: string, keyword: string) => {
  return client.automation.update({
    where: {
      id: automationId,
    },
    data: {
      keywords: {
        create: {
          word: keyword,
        },
      },
    },
  });
};

// La fonction deleteKeywordQuery est une fonction asynchrone utilisée pour supprimer
//  un mot-clé spécifique d'une base de données
export const deleteKeywordQuery = async (id: string) => {
  return client.keyword.delete({
    where: { id },
  });
};

export const addTrigger = async (automationId: string, trigger: string[]) => {
  if (trigger.length === 2) {
    return await client.automation.update({
      where: { id: automationId },
      data: {
        trigger: {
          createMany: {
            data: [{ type: trigger[0] }, { type: trigger[1] }],
          },
        },
      },
    });
  }
  return await client.automation.update({
    where: {
      id: automationId,
    },
    data: {
      trigger: {
        create: {
          type: trigger[0],
        },
      },
    },
  });
};
// La fonction addTrigger est une fonction asynchrone utilisée pour ajouter un ou plusieurs déclencheurs à une automatisation spécifique dans une base de données. Voici ce que vous devez savoir :
// Paramètres :
// automationId : Identifiant unique de l'automatisation à laquelle ajouter les déclencheurs.
// trigger : Un tableau de chaînes de caractères représentant les types de déclencheurs à ajouter.
// Fonctionnement :
// Vérification du Nombre de Déclencheurs :
// Si le tableau trigger contient exactement deux éléments, la fonction utilise createMany pour ajouter les deux déclencheurs en une seule opération.
// Sinon, elle utilise create pour ajouter un seul déclencheur.
// Mise à Jour de l'Automatisation :
// La fonction utilise client.automation.update pour mettre à jour l'automatisation dans la base de données.
// where: { id: automationId } : Filtre la mise à jour par l'identifiant unique de l'automatisation.
// data : Contient les données des déclencheurs à créer.
// Retour :
// La fonction retourne le résultat de l'opération de mise à jour, qui est l'automatisation mise à jour avec les nouveaux déclencheurs.

export const addPost = async (
  autmationId: string,
  posts: {
    postid: string;
    caption?: string;
    media: string;
    mediaType: "IMAGE" | "VIDEO" | "CAROSEL_ALBUM";
  }[]
) => {
  return await client.automation.update({
    where: {
      id: autmationId,
    },
    data: {
      posts: {
        createMany: {
          data: posts,
        },
      },
    },
  });
};
// La fonction addPost est une fonction asynchrone utilisée pour ajouter une ou plusieurs publications à une automatisation spécifique dans une base de données. Voici ce que vous devez savoir :
// Paramètres :
// autmationId : Identifiant unique de l'automatisation à laquelle ajouter les publications.
// posts : Un tableau d'objets représentant les publications à ajouter, avec les propriétés postid, caption, media, et mediaType.
// Fonctionnement :
// Mise à Jour de l'Automatisation :
// La fonction utilise client.automation.update pour mettre à jour l'automatisation dans la base de données.
// where: { id: autmationId } : Filtre la mise à jour par l'identifiant unique de l'automatisation.
// data : Contient les données des publications à créer, en utilisant createMany pour ajouter plusieurs publications en une seule opération.
// Retour :
// La fonction retourne le résultat de l'opération de mise à jour, qui est l'automatisation mise à jour avec les nouvelles publications.



