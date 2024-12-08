"use server";

import { onCurrentUser } from "../user";
import { createAutomation, findAutomation, getAutomations } from "./queries";

export const createAutomations = async (id?: string) => {
  const user = await onCurrentUser(); //Récupération de l'utilisateur courant
  try {
    //Création de l'automatisation(user.id : L'identifiant de l'utilisateur actuel
    //et id : L'identifiant optionnel pour personnaliser l'automatisation)
    const create = await createAutomation(user.id, id);
    if (create) return { status: 200, data: "Automation created", res: create };

    return { status: 404, data: "Oops! something went wrong" };
  } catch (error) {
    return { status: 500, data: "Internal server error" };
  }
};

//Recuperer tout les automatisations
export const getAllAutomations = async () => {
  const user = await onCurrentUser();
  try {
    const automations = await getAutomations(user.id);
    if (automations) return { status: 200, data: automations.automations };
    return { status: 404, data: [] };
  } catch (error) {
    return { status: 500, data: [] };
  }
};

export const getAutomationInfo = async (id: string) => {
  await onCurrentUser();
  try {
    const automation = await findAutomation(id);
    if (automation) return { status: 200, data: automation };

    return { status: 404 };
  } catch (error) {
    return { status: 500 };
  }
};

// La fonction getAutomationInfo est une fonction asynchrone utilisée pour obtenir des informations détaillées sur une automatisation spécifique. Voici ce que vous devez savoir :
// Paramètre :
// id : Identifiant unique de l'automatisation à rechercher.
// Fonctionnement :
// Vérification de l'Utilisateur Actuel :
// La fonction commence par appeler onCurrentUser() pour vérifier ou obtenir l'utilisateur actuel.
// Recherche de l'Automatisation :
// Elle utilise findAutomation(id) pour rechercher l'automatisation par son identifiant.
// Si l'automatisation est trouvée, elle retourne un objet avec un statut 200 et les données de l'automatisation.
// Si l'automatisation n'est pas trouvée, elle retourne un objet avec un statut 404.
// Gestion des Erreurs :
// En cas d'erreur lors de la recherche, elle retourne un objet avec un statut 500.
// Retour :
// La fonction retourne un objet avec un statut HTTP (200, 404, ou 500) et éventuellement les données de l'automatisation.
