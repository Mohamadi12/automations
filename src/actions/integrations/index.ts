"use server";

import { redirect } from "next/navigation";

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
