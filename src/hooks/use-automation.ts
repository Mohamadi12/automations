import { createAutomations } from "@/actions/automations";
import { useMutationData } from "./use-mutation-data";

export const useCreateAutomation = (id?: string) => {
  const { isPending, mutate } = useMutationData(
    ["create-automation"],
    () => createAutomations(id),
    "user-automations"
  );

  return { isPending, mutate };
};

//   Paramètre :
// id (optionnel) : Identifiant éventuel pour la nouvelle automatisation.
// Utilisation de useMutationData :
// Ce hook utilise un autre hook personnalisé useMutationData pour gérer la mutation de création d'une automatisation.
// useMutationData prend trois arguments :
// ['create-automation'] : Clé unique pour identifier cette mutation.
// () => createAutomations(id) : Fonction qui effectue la création de l'automatisation.
// 'user-automations' : Clé de la requête associée pour invalider les données après la création.
// Retour :
// Le hook retourne un objet avec deux propriétés :
// isPending : Booléen indiquant si la création est en cours.
// mutate : Fonction pour déclencher la création de l'automatisation.
