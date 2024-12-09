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




