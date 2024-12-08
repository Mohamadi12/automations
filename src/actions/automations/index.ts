"use server";

import { onCurrentUser } from "../user";
import { addKeyWord, addListener, addTrigger, createAutomation, deleteKeywordQuery, findAutomation, getAutomations, updateAutomation } from "./queries";

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



// Elle utilise updateAutomation(automationId, data) pour mettre 
// à jour l'automatisation avec les nouvelles données.
export const updateAutomationName = async (
  automationId: string,
  data: {
    name?: string
    active?: boolean
    automation?: string
  }
) => {
  await onCurrentUser()
  try {
    const update = await updateAutomation(automationId, data)
    if (update) {
      return { status: 200, data: 'Automation successfully updated' }
    }
    return { status: 404, data: 'Oops! could not find automation' }
  } catch (error) {
    return { status: 500, data: 'Oops! something went wrong' }
  }
}


export const saveListener = async (
  autmationId: string,
  listener: 'SMARTAI' | 'MESSAGE',
  prompt: string,
  reply?: string
) => {
  await onCurrentUser()
  try {
    const create = await addListener(autmationId, listener, prompt, reply)
    if (create) return { status: 200, data: 'Listener created' }
    return { status: 404, data: 'Cant save listener' }
  } catch (error) {
    return { status: 500, data: 'Oops! something went wrong' }
  }
}
// La fonction saveListener est une fonction asynchrone utilisée pour enregistrer un listener dans une automatisation spécifique. Voici ce que vous devez savoir :
// Paramètres :
// autmationId : Identifiant unique de l'automatisation à laquelle ajouter le listener.
// listener : Type de listener ('SMARTAI' ou 'MESSAGE').
// prompt : Texte du prompt associé au listener.
// reply (optionnel) : Texte de la réponse associée au listener.
// Fonctionnement :
// Vérification de l'Utilisateur Actuel :
// La fonction commence par appeler onCurrentUser() pour vérifier ou obtenir l'utilisateur actuel.
// Ajout du Listener :
// Elle utilise addListener(autmationId, listener, prompt, reply) pour ajouter le listener à l'automatisation.
// Si l'ajout réussit, elle retourne un objet avec un statut 200 et un message de succès.
// Si l'ajout échoue, elle retourne un objet avec un statut 404 et un message d'erreur.
// Gestion des Erreurs :
// En cas d'erreur lors de l'ajout, elle retourne un objet avec un statut 500 et un message d'erreur générique.
// Retour :
// La fonction retourne un objet avec un statut HTTP (200, 404, ou 500) et un message correspondant.




// La fonction saveKeyword est une fonction asynchrone utilisée 
// pour enregistrer un mot-clé dans une automatisation spécifique.
export const saveKeyword = async (automationId: string, keyword: string) => {
  await onCurrentUser()
  try {
    const create = await addKeyWord(automationId, keyword)

    if (create) return { status: 200, data: 'Keyword added successfully' }

    return { status: 404, data: 'Cannot add this keyword' }
  } catch (error) {
    return { status: 500, data: 'Oops! something went wrong' }
  }
}




// La fonction deleteKeyword est une fonction asynchrone 
// utilisée pour supprimer un mot-clé spécifique d'une base de données
export const deleteKeyword = async (id: string) => {
  await onCurrentUser()
  try {
    const deleted = await deleteKeywordQuery(id)
    if (deleted)
      return {
        status: 200,
        data: 'Keyword deleted',
      }
    return { status: 404, data: 'Keyword not found' }
  } catch (error) {
    return { status: 500, data: 'Oops! something went wrong' }
  }
}



// La fonction saveTrigger est une fonction asynchrone utilisée pour enregistrer un ou plusieurs déclencheurs dans une automatisation spécifique. Voici ce que vous devez savoir :
// Paramètres :
// automationId : Identifiant unique de l'automatisation à laquelle ajouter les déclencheurs.
// trigger : Un tableau de chaînes de caractères représentant les types de déclencheurs à ajouter.
// Fonctionnement :
// Vérification de l'Utilisateur Actuel :
// La fonction commence par appeler onCurrentUser() pour vérifier ou obtenir l'utilisateur actuel.
// Ajout des Déclencheurs :
// Elle utilise addTrigger(automationId, trigger) pour ajouter les déclencheurs à l'automatisation.
export const saveTrigger = async (automationId: string, trigger: string[]) => {
  await onCurrentUser()
  try {
    const create = await addTrigger(automationId, trigger)
    if (create) return { status: 200, data: 'Trigger saved' }
    return { status: 404, data: 'Cannot save trigger' }
  } catch (error) {
    return { status: 500, data: 'Oops! something went wrong' }
  }
}









