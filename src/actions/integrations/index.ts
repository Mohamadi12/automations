"use server";

import axios from "axios";
import { redirect } from "next/navigation";
import { onCurrentUser } from "../user";
import { generateTokens } from "@/lib/fetch";
import { createIntegration, getIntegration } from "./queries";

export const onOAuthInstagram = (strategy: "INSTAGRAM" | "CRM") => {
  if (strategy === "INSTAGRAM") {
    return redirect(process.env.INSTAGRAM_EMBEDDED_OAUTH_URL as string);
  }
};
//   La fonction onOAuthInstagram est utilisée pour rediriger l'utilisateur vers une URL OAuth spécifique en fonction de la stratégie d'intégration. Voici ce que vous devez savoir :
// Paramètres :
// strategy : Stratégie d'intégration ('INSTAGRAM' ou 'CRM').
// Fonctionnement :
// Redirection :
// Si la stratégie est 'INSTAGRAM', la fonction redirige l'utilisateur vers l'URL OAuth Instagram spécifiée dans la variable d'environnement INSTAGRAM_EMBEDDED_OAUTH_URL.
// Retour :
// La fonction retourne la redirection vers l'URL OAuth spécifiée.




export const onIntegrate = async (code: string) => {
  const user = await onCurrentUser()

  try {
    const integration = await getIntegration(user.id)

    if (integration && integration.integrations.length === 0) {
      const token = await generateTokens(code)
      console.log(token)

      if (token) {
        const insta_id = await axios.get(
          `${process.env.INSTAGRAM_BASE_URL}/me?fields=user_id&access_token=${token.access_token}`
        )

        const today = new Date()
        const expire_date = today.setDate(today.getDate() + 60)
        const create = await createIntegration(
          user.id,
          token.access_token,
          new Date(expire_date),
          insta_id.data.user_id
        )
        return { status: 200, data: create }
      }
      console.log('🔴 401')
      return { status: 401 }
    }
    console.log('🔴 404')
    return { status: 404 }
  } catch (error) {
    console.log('🔴 500', error)
    return { status: 500 }
  }
}