"use server";

import { onCurrentUser } from "../user";
import { createAutomation, getAutomations } from "./queries";

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
