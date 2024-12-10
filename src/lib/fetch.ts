import axios from "axios";

export const refreshToken = async (token: string) => {
  const refresh_token = await axios.get(
    `${process.env.INSTAGRAM_BASE_URL}/refresh_access_token?grant_type=ig_refresh_token&access_token=${token}`
  );

  return refresh_token.data;
};
// La fonction refreshToken est une fonction asynchrone utilisée pour rafraîchir un token d'accès Instagram. Voici ce que vous devez savoir :
// Paramètres :
// token : Token d'accès actuel à rafraîchir.
// Fonctionnement :
// Rafraîchissement du Token :
// La fonction utilise axios.get pour envoyer une requête GET à l'API Instagram pour rafraîchir le token d'accès.
// L'URL de la requête est construite en utilisant l'URL de base de l'API Instagram (process.env.INSTAGRAM_BASE_URL) et inclut le type de grant (grant_type=ig_refresh_token) et le token d'accès actuel (access_token=${token}).
// Retour :
// La fonction retourne les données de la réponse de la requête GET, qui contiennent le nouveau token d'accès.



export const sendDM = async (
  userId: string,
  recieverId: string,
  prompt: string,
  token: string
) => {
  console.log("sending message");
  return await axios.post(
    `${process.env.INSTAGRAM_BASE_URL}/v21.0/${userId}/messages`,
    {
      recipient: {
        id: recieverId,
      },
      message: {
        text: prompt,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};
// La fonction sendDM est une fonction asynchrone utilisée pour envoyer un message direct (DM) via l'API Instagram. Voici ce que vous devez savoir :
// Paramètres :
// userId : Identifiant unique de l'utilisateur qui envoie le message.
// recieverId : Identifiant unique du destinataire du message.
// prompt : Texte du message à envoyer.
// token : Token d'authentification pour accéder à l'API Instagram.
// Fonctionnement :
// Envoi du Message :
// La fonction utilise axios.post pour envoyer une requête POST à l'API Instagram.
// L'URL de la requête est construite en utilisant l'identifiant de l'utilisateur (userId) et l'URL de base de l'API Instagram (process.env.INSTAGRAM_BASE_URL).
// Le corps de la requête contient l'identifiant du destinataire (recieverId) et le texte du message (prompt).
// Les en-têtes de la requête incluent le token d'authentification (Authorization: Bearer ${token}) et le type de contenu ('Content-Type': 'application/json').
// Retour :
// La fonction retourne la réponse de la requête POST, qui est la réponse de l'API Instagram.




export const sendPrivateMessage = async (
  userId: string,
  recieverId: string,
  prompt: string,
  token: string
) => {
  console.log('sending message')
  return await axios.post(
    `${process.env.INSTAGRAM_BASE_URL}/${userId}/messages`,
    {
      recipient: {
        comment_id: recieverId,
      },
      message: {
        text: prompt,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  )
}
// Fonction sendPrivateMessage
// Objectif :
// Cette fonction permet d'envoyer un message privé à un utilisateur spécifique sur Instagram.
// Paramètres :
// userId (string) : L'ID de l'utilisateur qui envoie le message.
// recieverId (string) : L'ID du destinataire du message.
// prompt (string) : Le contenu du message à envoyer.
// token (string) : Le jeton d'authentification nécessaire pour effectuer la requête.
// Action :
// La fonction utilise axios pour envoyer une requête POST à l'API Instagram.
// L'URL de la requête est construite en utilisant l'URL de base Instagram (process.env.INSTAGRAM_BASE_URL) et l'ID de l'utilisateur qui envoie le message (userId).
// Le corps de la requête contient :
// recipient : L'ID du destinataire (recieverId).
// message : Le contenu du message (prompt).
// Les en-têtes de la requête incluent :
// Authorization : Le jeton d'authentification sous forme de Bearer token.
// Content-Type : Le type de contenu (application/json).
// Retour :
// La fonction retourne la réponse de la requête POST effectuée via axios.



export const generateTokens = async (code: string) => {
  const insta_form = new FormData()
  insta_form.append('client_id', process.env.INSTAGRAM_CLIENT_ID as string)

  insta_form.append(
    'client_secret',
    process.env.INSTAGRAM_CLIENT_SECRET as string
  )
  insta_form.append('grant_type', 'authorization_code')
  insta_form.append(
    'redirect_uri',
    `${process.env.NEXT_PUBLIC_HOST_URL}/callback/instagram`
  )
  insta_form.append('code', code)

  const shortTokenRes = await fetch(process.env.INSTAGRAM_TOKEN_URL as string, {
    method: 'POST',
    body: insta_form,
  })

  const token = await shortTokenRes.json()
  if (token.permissions.length > 0) {
    console.log(token, 'got permissions')
    const long_token = await axios.get(
      `${process.env.INSTAGRAM_BASE_URL}/access_token?grant_type=ig_exchange_token&client_secret=${process.env.INSTAGRAM_CLIENT_SECRET}&access_token=${token.access_token}`
    )

    return long_token.data
  }
}
// Fonction generateTokens
// Objectif :
// Cette fonction permet de générer des tokens d'accès pour l'API Instagram en utilisant un code d'autorisation.
// Paramètres :
// code (string) : Le code d'autorisation obtenu après que l'utilisateur ait autorisé l'application.
// Action :
// Création du formulaire de données :
// La fonction crée un objet FormData pour envoyer les données nécessaires à l'API Instagram.
// Les données ajoutées au formulaire incluent :
// client_id : L'ID client de l'application Instagram.
// client_secret : Le secret client de l'application Instagram.
// grant_type : Le type d'autorisation (authorization_code).
// redirect_uri : L'URL de redirection après l'autorisation.
// code : Le code d'autorisation obtenu.
// Requête pour obtenir le token court :
// La fonction envoie une requête POST à l'URL de l'API Instagram pour obtenir un token d'accès court.
// Le corps de la requête contient les données du formulaire créé précédemment.
// Traitement de la réponse :
// La réponse de la requête est convertie en JSON.
// Si la réponse contient des permissions (token.permissions.length > 0), la fonction continue.
// Requête pour obtenir le token long :
// La fonction envoie une requête GET à l'API Instagram pour échanger le token court contre un token d'accès long.
// Les paramètres de la requête incluent :
// grant_type : Le type d'échange (ig_exchange_token).
// client_secret : Le secret client de l'application Instagram.
// access_token : Le token d'accès court obtenu précédemment.
// Retour :
// La fonction retourne les données du token d'accès long obtenu via la requête GET.