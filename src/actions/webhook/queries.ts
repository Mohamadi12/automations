import { client } from "@/lib/prisma";

export const matchKeyword = async (keyword: string) => {
  return await client.keyword.findFirst({
    where: {
      word: {
        equals: keyword,
        mode: "insensitive",
      },
    },
  });
};
// La fonction matchKeyword est une fonction asynchrone utilisée pour rechercher un mot-clé spécifique dans une base de données sans tenir compte de la casse. Voici ce que vous devez savoir :
// Paramètres :
// keyword : Mot-clé à rechercher.
// Fonctionnement :
// Recherche de Mot-Clé :
// La fonction utilise client.keyword.findFirst pour rechercher le premier mot-clé correspondant dans la base de données.
// where: { word: { equals: keyword, mode: 'insensitive' } } : Filtre la recherche par le mot-clé spécifié, en ignorant la casse (mode: 'insensitive').
// Retour :
// La fonction retourne le résultat de la recherche, qui est le premier mot-clé trouvé correspondant au mot-clé spécifié.



export const getKeywordAutomation = async (
  automationId: string,
  dm: boolean
) => {
  return await client.automation.findUnique({
    where: {
      id: automationId,
    },

    include: {
      dms: dm,
      trigger: {
        where: {
          type: dm ? "DM" : "COMMENT",
        },
      },
      listener: true,
      User: {
        select: {
          subscription: {
            select: {
              plan: true,
            },
          },
          integrations: {
            select: {
              token: true,
            },
          },
        },
      },
    },
  });
};
// La fonction getKeywordAutomation est une fonction asynchrone utilisée pour récupérer une automatisation spécifique avec des relations associées dans une base de données. Voici ce que vous devez savoir :
// Paramètres :
// automationId : Identifiant unique de l'automatisation à récupérer.
// dm : Booléen indiquant si l'automatisation est liée à des messages directs (DM).
// Fonctionnement :
// Recherche de l'Automatisation :
// La fonction utilise client.automation.findUnique pour rechercher une automatisation unique par son identifiant (automationId).
// where: { id: automationId } : Filtre la recherche par l'identifiant unique de l'automatisation.
// include : Inclut des relations associées à l'automatisation :
// dms : Inclut les messages directs si dm est true.
// trigger : Inclut les déclencheurs, filtrés par type (DM si dm est true, sinon COMMENT).
// listener : Inclut le listener associé.
// User : Inclut l'utilisateur associé, avec des champs spécifiques sélectionnés (subscription et integrations).
// Retour :
// La fonction retourne le résultat de la recherche, qui est l'automatisation trouvée avec les relations incluses.



export const trackResponses = async (
  automationId: string,
  type: "COMMENT" | "DM"
) => {
  if (type === "COMMENT") {
    return await client.listener.update({
      where: { automationId },
      data: {
        commentCount: {
          increment: 1,
        },
      },
    });
  }

  if (type === "DM") {
    return await client.listener.update({
      where: { automationId },
      data: {
        dmCount: {
          increment: 1,
        },
      },
    });
  }
};
//   La fonction trackResponses est une fonction asynchrone utilisée pour suivre les réponses (commentaires ou messages directs) d'une automatisation spécifique dans une base de données. Voici ce que vous devez savoir :
//   Paramètres :
//   automationId : Identifiant unique de l'automatisation.
//   type : Type de réponse ('COMMENT' ou 'DM').
//   Fonctionnement :
//   Suivi des Réponses :
//   Si le type de réponse est 'COMMENT', la fonction utilise client.listener.update pour mettre à jour le compteur de commentaires (commentCount) de l'automatisation.
//   Si le type de réponse est 'DM', la fonction utilise client.listener.update pour mettre à jour le compteur de messages directs (dmCount) de l'automatisation.
//   where: { automationId } : Filtre la mise à jour par l'identifiant unique de l'automatisation.
//   data : Contient les données de mise à jour, en incrémentant le compteur correspondant (commentCount ou dmCount).
//   Retour :
//   La fonction retourne le résultat de l'opération de mise à jour, qui est le listener mis à jour avec le compteur incrémenté.


export const createChatHistory = (
    automationId: string,
    sender: string,
    reciever: string,
    message: string
  ) => {
    return client.automation.update({
      where: {
        id: automationId,
      },
      data: {
        dms: {
          create: {
            reciever,
            senderId: sender,
            message,
          },
        },
      },
    })
  }
//   Objectif :
// Cette fonction permet de créer un historique de chat en ajoutant un nouveau message à une automation spécifique.
// Paramètres :
// automationId (string) : L'ID de l'automation à laquelle le message sera ajouté.
// sender (string) : L'ID de l'expéditeur du message.
// reciever (string) : L'ID du destinataire du message.
// message (string) : Le contenu du message à ajouter.
// Action :
// La fonction utilise un client pour mettre à jour une automation spécifique (automationId).
// Elle ajoute un nouveau message dans la liste des messages directs (dms) de cette automation.
// Le message est créé avec les informations suivantes :
// reciever : L'ID du destinataire.
// senderId : L'ID de l'expéditeur.
// message : Le contenu du message.
// Retour :
// La fonction retourne le résultat de l'opération de mise à jour de l'automation via le client.
  







export const getKeywordPost = async (postId: string, automationId: string) => {
    return await client.post.findFirst({
      where: {
        AND: [{ postid: postId }, { automationId }],
      },
      select: { automationId: true },
    })
  }
//   Fonction getKeywordPost
// Objectif :
// Cette fonction permet de récupérer un post spécifique associé à une automation en fonction de son ID.
// Paramètres :
// postId (string) : L'ID du post à rechercher.
// automationId (string) : L'ID de l'automation associée au post.
// Action :
// La fonction utilise un client pour rechercher le premier post qui correspond aux critères suivants :
// postid : L'ID du post.
// automationId : L'ID de l'automation.
// Elle ne sélectionne que l'ID de l'automation (automationId).
// Retour :
// La fonction retourne le résultat de la recherche, c'est-à-dire l'ID de l'automation si un post correspondant est trouvé.
  
 


export const getChatHistory = async (sender: string, reciever: string) => {
    const history = await client.dms.findMany({
      where: {
        AND: [{ senderId: sender }, { reciever }],
      },
      orderBy: { createdAt: 'asc' },
    })
    const chatSession: {
      role: 'assistant' | 'user'
      content: string
    }[] = history.map((chat) => {
      return {
        role: chat.reciever ? 'assistant' : 'user',
        content: chat.message!,
      }
    })
  
    return {
      history: chatSession,
      automationId: history[history.length - 1].automationId,
    }
  }
//   Fonction getChatHistory
// Objectif :
// Cette fonction permet de récupérer l'historique de chat entre un expéditeur et un destinataire, ainsi que l'ID de l'automation associée.
// Paramètres :
// sender (string) : L'ID de l'expéditeur.
// reciever (string) : L'ID du destinataire.
// Action :
// La fonction utilise un client pour rechercher tous les messages directs (dms) qui correspondent aux critères suivants :
// senderId : L'ID de l'expéditeur.
// reciever : L'ID du destinataire.
// Les messages sont triés par date de création (createdAt) dans l'ordre croissant.
// Elle transforme l'historique de chat en un tableau d'objets, où chaque objet contient :
// role : Le rôle de l'interlocuteur ('assistant' si c'est le destinataire, 'user' si c'est l'expéditeur).
// content : Le contenu du message.
// Retour :
// La fonction retourne un objet contenant :
// history : Le tableau d'objets représentant l'historique de chat.
// automationId : L'ID de l'automation associée au dernier message de l'historique.