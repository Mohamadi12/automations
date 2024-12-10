import { findAutomation } from "@/actions/automations/queries";
import {
  createChatHistory,
  getChatHistory,
  getKeywordAutomation,
  getKeywordPost,
  matchKeyword, 
  trackResponses,
} from "@/actions/webhook/queries";
import { sendDM, sendPrivateMessage } from "@/lib/fetch";
import { openai } from "@/lib/openai";
import { client } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const hub = req.nextUrl.searchParams.get("hub.challenge");
  return new NextResponse(hub);
}
//   La fonction GET est une fonction asynchrone utilisée pour répondre à une requête HTTP GET dans une application Next.js. Voici ce que vous devez savoir :
// Paramètres :
// req : Objet NextRequest représentant la requête HTTP entrante.
// Fonctionnement :
// Récupération du Paramètre :
// La fonction récupère le paramètre hub.challenge à partir des paramètres de la requête (req.nextUrl.searchParams.get('hub.challenge')).
// Réponse :
// La fonction retourne une nouvelle réponse HTTP (NextResponse) contenant la valeur du paramètre hub.challenge.
// Retour :
// La fonction retourne une réponse HTTP contenant la valeur du paramètre hub.challenge.

export async function POST(req: NextRequest) {
  const webhook_payload = await req.json();
  let matcher;
  try {
    if (webhook_payload.entry[0].messaging) {
      matcher = await matchKeyword(
        webhook_payload.entry[0].messaging[0].message.text
      );
    }

    if (webhook_payload.entry[0].changes) {
      matcher = await matchKeyword(
        webhook_payload.entry[0].changes[0].value.text
      );
    }

    if (matcher && matcher.automationId) {
      console.log("Matched");
      // We have a keyword matcher

      if (webhook_payload.entry[0].messaging) {
        const automation = await getKeywordAutomation(
          matcher.automationId,
          true
        );

        if (automation && automation.trigger) {
          if (
            automation.listener &&
            automation.listener.listener === "MESSAGE"
          ) {
            const direct_message = await sendDM(
              webhook_payload.entry[0].id,
              webhook_payload.entry[0].messaging[0].sender.id,
              automation.listener?.prompt,
              automation.User?.integrations[0].token!
            );

            if (direct_message.status === 200) {
              const tracked = await trackResponses(automation.id, "DM");
              if (tracked) {
                return NextResponse.json(
                  {
                    message: "Message sent",
                  },
                  { status: 200 }
                );
              }
            }
          }

          if (
            automation.listener &&
            automation.listener.listener === "SMARTAI" &&
            automation.User?.subscription?.plan === "PRO"
          ) {
            const smart_ai_message = await openai.chat.completions.create({
              model: "gpt-4o",
              messages: [
                {
                  role: "assistant",
                  content: `${automation.listener?.prompt}: Keep responses under 2 sentences`,
                },
              ],
            });

            if (smart_ai_message.choices[0].message.content) {
              const reciever = createChatHistory(
                automation.id,
                webhook_payload.entry[0].id,
                webhook_payload.entry[0].messaging[0].sender.id,
                webhook_payload.entry[0].messaging[0].message.text
              );

              const sender = createChatHistory(
                automation.id,
                webhook_payload.entry[0].id,
                webhook_payload.entry[0].messaging[0].sender.id,
                smart_ai_message.choices[0].message.content
              );

              await client.$transaction([reciever, sender]);

              const direct_message = await sendDM(
                webhook_payload.entry[0].id,
                webhook_payload.entry[0].messaging[0].sender.id,
                smart_ai_message.choices[0].message.content,
                automation.User?.integrations[0].token!
              );

              if (direct_message.status === 200) {
                const tracked = await trackResponses(automation.id, "DM");
                if (tracked) {
                  return NextResponse.json(
                    {
                      message: "Message sent",
                    },
                    { status: 200 }
                  );
                }
              }
            }
          }
        }
      }

      if (
        webhook_payload.entry[0].changes &&
        webhook_payload.entry[0].changes[0].field === "comments"
      ) {
        const automation = await getKeywordAutomation(
          matcher.automationId,
          false
        );

        console.log("geting the automations");

        const automations_post = await getKeywordPost(
          webhook_payload.entry[0].changes[0].value.media.id,
          automation?.id!
        );

        console.log("found keyword ", automations_post);

        if (automation && automations_post && automation.trigger) {
          console.log("first if");
          if (automation.listener) {
            console.log("first if");
            if (automation.listener.listener === "MESSAGE") {
              console.log(
                "SENDING DM, WEB HOOK PAYLOAD",
                webhook_payload,
                "changes",
                webhook_payload.entry[0].changes[0].value.from
              );

              console.log(
                "COMMENT VERSION:",
                webhook_payload.entry[0].changes[0].value.from.id
              );

              const direct_message = await sendPrivateMessage(
                webhook_payload.entry[0].id,
                webhook_payload.entry[0].changes[0].value.id,
                automation.listener?.prompt,
                automation.User?.integrations[0].token!
              );

              console.log("DM SENT", direct_message.data);
              if (direct_message.status === 200) {
                const tracked = await trackResponses(automation.id, "COMMENT");

                if (tracked) {
                  return NextResponse.json(
                    {
                      message: "Message sent",
                    },
                    { status: 200 }
                  );
                }
              }
            }
            if (
              automation.listener.listener === "SMARTAI" &&
              automation.User?.subscription?.plan === "PRO"
            ) {
              const smart_ai_message = await openai.chat.completions.create({
                model: "gpt-4o",
                messages: [
                  {
                    role: "assistant",
                    content: `${automation.listener?.prompt}: keep responses under 2 sentences`,
                  },
                ],
              });
              if (smart_ai_message.choices[0].message.content) {
                const reciever = createChatHistory(
                  automation.id,
                  webhook_payload.entry[0].id,
                  webhook_payload.entry[0].changes[0].value.from.id,
                  webhook_payload.entry[0].changes[0].value.text
                );

                const sender = createChatHistory(
                  automation.id,
                  webhook_payload.entry[0].id,
                  webhook_payload.entry[0].changes[0].value.from.id,
                  smart_ai_message.choices[0].message.content
                );

                await client.$transaction([reciever, sender]);

                const direct_message = await sendPrivateMessage(
                  webhook_payload.entry[0].id,
                  webhook_payload.entry[0].changes[0].value.id,
                  automation.listener?.prompt,
                  automation.User?.integrations[0].token!
                );

                if (direct_message.status === 200) {
                  const tracked = await trackResponses(
                    automation.id,
                    "COMMENT"
                  );

                  if (tracked) {
                    return NextResponse.json(
                      {
                        message: "Message sent",
                      },
                      { status: 200 }
                    );
                  }
                }
              }
            }
          }
        }
      }
    }

    if (!matcher) {
      const customer_history = await getChatHistory(
        webhook_payload.entry[0].messaging[0].recipient.id,
        webhook_payload.entry[0].messaging[0].sender.id
      );

      if (customer_history.history.length > 0) {
        const automation = await findAutomation(customer_history.automationId!);

        if (
          automation?.User?.subscription?.plan === "PRO" &&
          automation.listener?.listener === "SMARTAI"
        ) {
          const smart_ai_message = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
              {
                role: "assistant",
                content: `${automation.listener?.prompt}: keep responses under 2 sentences`,
              },
              ...customer_history.history,
              {
                role: "user",
                content: webhook_payload.entry[0].messaging[0].message.text,
              },
            ],
          });

          if (smart_ai_message.choices[0].message.content) {
            const reciever = createChatHistory(
              automation.id,
              webhook_payload.entry[0].id,
              webhook_payload.entry[0].messaging[0].sender.id,
              webhook_payload.entry[0].messaging[0].message.text
            );

            const sender = createChatHistory(
              automation.id,
              webhook_payload.entry[0].id,
              webhook_payload.entry[0].messaging[0].sender.id,
              smart_ai_message.choices[0].message.content
            );
            await client.$transaction([reciever, sender]);
            const direct_message = await sendDM(
              webhook_payload.entry[0].id,
              webhook_payload.entry[0].messaging[0].sender.id,
              smart_ai_message.choices[0].message.content,
              automation.User?.integrations[0].token!
            );

            if (direct_message.status === 200) {
              //if successfully send we return

              return NextResponse.json(
                {
                  message: "Message sent",
                },
                { status: 200 }
              );
            }
          }
        }
      }

      return NextResponse.json(
        {
          message: "No automation set",
        },
        { status: 200 }
      );
    }
    return NextResponse.json(
      {
        message: "No automation set",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "No automation set",
      },
      { status: 200 }
    );
  }
}

// Fonction POST
// Objectif :
// Cette fonction est un gestionnaire de requête POST pour un webhook. Elle traite les données reçues du webhook, recherche une correspondance de mot-clé, et envoie un message direct si une correspondance est trouvée.
// Paramètres :
// req (NextRequest) : La requête HTTP POST reçue par le serveur.
// Action :
// Extraction des données du webhook :
// La fonction extrait les données JSON de la requête (webhook_payload).
// Recherche de correspondance de mot-clé :
// La fonction vérifie si les données du webhook contiennent des messages (messaging) ou des changements (changes).
// Si des messages sont présents, elle appelle la fonction matchKeyword avec le texte du message pour trouver une correspondance de mot-clé.
// Si des changements sont présents, elle appelle également matchKeyword avec le texte du changement.
// Traitement de la correspondance :
// Si une correspondance est trouvée (matcher && matcher.automationId), la fonction continue.
// Elle récupère les détails de l'automation associée à la correspondance en utilisant getKeywordAutomation.
// Si l'automation existe et a un déclencheur (trigger), elle vérifie si l'automation a un écouteur (listener) configuré pour les messages (MESSAGE).
// Envoi du message direct :
// Si l'écouteur est configuré pour les messages, la fonction envoie un message direct (sendDM) au destinataire en utilisant les détails de l'automation.
// Si le message est envoyé avec succès (direct_message.status === 200), elle enregistre la réponse (trackResponses).
// Réponse au client :
// Si la réponse est enregistrée avec succès, la fonction retourne une réponse JSON indiquant que le message a été envoyé avec succès.
// Retour :
// La fonction retourne une réponse JSON avec un message de succès si le message direct est envoyé et enregistré avec succès.

// Objectif :
// Cette partie de code traite les cas où l'automation est configurée pour utiliser une intelligence artificielle (SMARTAI) et où l'utilisateur a un abonnement PRO. Elle génère une réponse à l'aide de l'API OpenAI, enregistre l'historique de chat, et envoie un message direct.
// Action :
// Vérification des conditions :
// La fonction vérifie si l'automation a un écouteur (listener) configuré pour SMARTAI et si l'utilisateur a un abonnement PRO.
// Génération de la réponse avec OpenAI :
// La fonction utilise l'API OpenAI pour générer une réponse en utilisant le modèle gpt-4o.
// Le prompt est fourni avec une instruction pour limiter la réponse à deux phrases.
// Enregistrement de l'historique de chat :
// Si la réponse générée par OpenAI est valide, la fonction enregistre l'historique de chat pour le message reçu et la réponse générée.
// Elle utilise la fonction createChatHistory pour enregistrer les deux messages.
// Envoi du message direct :
// La fonction envoie un message direct (sendDM) au destinataire en utilisant la réponse générée par OpenAI.
// Si le message est envoyé avec succès (direct_message.status === 200), elle enregistre la réponse (trackResponses).
// Réponse au client :
// Si la réponse est enregistrée avec succès, la fonction retourne une réponse JSON indiquant que le message a été envoyé avec succès.
// Retour :
// La fonction retourne une réponse JSON avec un message de succès si le message direct est envoyé et enregistré avec succès.

// Objectif :
// Cette partie de code traite les cas où un changement dans les commentaires est détecté. Elle vérifie si une automation correspondante existe, puis envoie un message direct en fonction des configurations de l'automation.
// Action :
// Récupération de l'automation associée au post :
// La fonction récupère l'automation associée au post en utilisant la fonction getKeywordPost.
// Vérification des conditions :
// La fonction vérifie si l'automation existe et si elle a un déclencheur (trigger).
// Traitement des messages directs (MESSAGE) :
// Si l'automation a un écouteur configuré pour les messages (MESSAGE), la fonction envoie un message direct (sendPrivateMessage) au destinataire.
// Si le message est envoyé avec succès (direct_message.status === 200), elle enregistre la réponse (trackResponses).
// Traitement des messages intelligents (SMARTAI) :
// Si l'automation a un écouteur configuré pour SMARTAI et que l'utilisateur a un abonnement PRO, la fonction génère une réponse à l'aide de l'API OpenAI.
// La réponse générée par OpenAI est ensuite utilisée pour envoyer un message direct (sendPrivateMessage).
// Si le message est envoyé avec succès, elle enregistre la réponse.
// Réponse au client :
// Si la réponse est enregistrée avec succès, la fonction retourne une réponse JSON indiquant que le message a été envoyé avec succès.
// Retour :
// La fonction retourne une réponse JSON avec un message de succès si le message direct est envoyé et enregistré avec succès.

// Partie de code
// Objectif :
// Cette partie de code traite les cas où aucune correspondance de mot-clé n'est trouvée. Elle récupère l'historique de chat entre l'expéditeur et le destinataire, puis utilise l'API OpenAI pour générer une réponse si l'utilisateur a un abonnement PRO et si l'automation est configurée pour SMARTAI.
// Action :
// Vérification de l'absence de correspondance :
// La fonction vérifie si aucune correspondance de mot-clé n'a été trouvée (!matcher).
// Récupération de l'historique de chat :
// La fonction récupère l'historique de chat entre l'expéditeur et le destinataire en utilisant la fonction getChatHistory.
// Vérification de l'historique de chat :
// Si l'historique de chat contient des messages, la fonction continue.
// Recherche de l'automation :
// La fonction recherche l'automation associée à l'historique de chat en utilisant la fonction findAutomation.
// Vérification des conditions pour SMARTAI :
// La fonction vérifie si l'utilisateur a un abonnement PRO et si l'automation est configurée pour SMARTAI.
// Génération de la réponse avec OpenAI :
// Si les conditions sont remplies, la fonction utilise l'API OpenAI pour générer une réponse en utilisant le modèle gpt-4o.
// Le prompt est fourni avec une instruction pour limiter la réponse à deux phrases, et l'historique de chat est inclus dans la requête.
// Enregistrement de l'historique de chat :
// Si la réponse générée par OpenAI est valide, la fonction enregistre l'historique de chat pour le message reçu et la réponse générée.
// Elle utilise la fonction createChatHistory pour enregistrer les deux messages.
// Envoi du message direct :
// La fonction envoie un message direct (sendDM) au destinataire en utilisant la réponse générée par OpenAI.
// Si le message est envoyé avec succès (direct_message.status === 200), elle retourne une réponse JSON indiquant que le message a été envoyé avec succès.
// Gestion des erreurs et des cas sans automation :
// Si aucune correspondance n'est trouvée ou si une erreur se produit, la fonction retourne une réponse JSON indiquant qu'aucune automation n'est configurée.
// Retour :
// La fonction retourne une réponse JSON avec un message de succès si le message direct est envoyé avec succès, ou un message indiquant qu'aucune automation n'est configurée si aucune correspondance n'est trouvée ou si une erreur se produit.
