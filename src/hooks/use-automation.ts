import { z } from "zod";
import useZodForm from "./use-zod-form";
import {
  createAutomations,
  deleteKeyword,
  saveKeyword,
  saveListener,
  saveTrigger,
  updateAutomationName,
} from "@/actions/automations";
import { useMutationData } from "./use-mutation-data";
import { useEffect, useRef, useState } from "react";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { TRIGGER } from "@/redux/slices/automation";

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

export const useEditAutomation = (automationId: string) => {
  const [edit, setEdit] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const enableEdit = () => setEdit(true);
  const disableEdit = () => setEdit(false);

  const { isPending, mutate } = useMutationData(
    ["update-automation"],
    (data: { name: string }) =>
      updateAutomationName(automationId, { name: data.name }),
    "automation-info",
    disableEdit
  );

  useEffect(() => {
    function handleClickOutside(this: Document, event: MouseEvent) {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node | null)
      ) {
        if (inputRef.current.value !== "") {
          mutate({ name: inputRef.current.value });
        } else {
          disableEdit();
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return {
    edit,
    enableEdit,
    disableEdit,
    inputRef,
    isPending,
  };
};
// Le hook useEditAutomation est utilisé pour gérer l'édition du nom d'une automatisation dans une application React. Voici ce que vous devez savoir :
// Paramètre :
// automationId : Identifiant unique de l'automatisation à éditer.
// État et Références :
// État :
// edit : Un état booléen pour indiquer si l'édition est activée ou non.
// setEdit : Une fonction pour modifier l'état edit.
// Références :
// inputRef : Une référence à l'élément d'entrée HTML pour le nom de l'automatisation.
// Fonctions :
// Gestion de l'Édition :
// enableEdit : Active l'édition en mettant edit à true.
// disableEdit : Désactive l'édition en mettant edit à false.
// Mutation de Données :
// useMutationData : Utilise un hook personnalisé pour gérer la mutation de mise à jour du nom de l'automatisation.
// mutate : Fonction pour déclencher la mutation avec le nouveau nom.
// Effet de Bord :
// Gestion des Clics Extérieurs :
// Un effet de bord est utilisé pour détecter les clics en dehors de l'élément d'entrée.
// Si un clic est détecté en dehors de l'élément d'entrée et que la valeur de l'entrée n'est pas vide, la mutation est déclenchée pour mettre à jour le nom.
// Si la valeur de l'entrée est vide, l'édition est désactivée.
// Retour :
// Le hook retourne un objet avec les propriétés suivantes :
// edit : État d'édition.
// enableEdit : Fonction pour activer l'édition.
// disableEdit : Fonction pour désactiver l'édition.
// inputRef : Référence à l'élément d'entrée.
// isPending : Indicateur de statut de la mutation.

export const useListener = (id: string) => {
  const [listener, setListener] = useState<"MESSAGE" | "SMARTAI" | null>(null);

  const promptSchema = z.object({
    prompt: z.string().min(1),
    reply: z.string(),
  });

  const { isPending, mutate } = useMutationData(
    ["create-lister"],
    (data: { prompt: string; reply: string }) =>
      saveListener(id, listener || "MESSAGE", data.prompt, data.reply),
    "automation-info"
  );

  const { errors, onFormSubmit, register, reset, watch } = useZodForm(
    promptSchema,
    mutate
  );

  const onSetListener = (type: "SMARTAI" | "MESSAGE") => setListener(type);
  return { onSetListener, register, onFormSubmit, listener, isPending };
};
// Le hook useListener est utilisé pour gérer les listeners dans une automatisation. Voici ce que vous devez savoir :
// Paramètres :
// id : Identifiant unique de l'automatisation.
// État :
// listener : Un état pour stocker le type de listener ('MESSAGE', 'SMARTAI', ou null).
// setListener : Une fonction pour mettre à jour l'état listener.
// Schéma de Validation :
// promptSchema : Un schéma de validation Zod pour valider les champs prompt et reply.
// Mutations :
// Ajout de Listener :
// Utilise useMutationData pour gérer la mutation d'ajout d'un listener.
// mutate : Fonction pour déclencher la mutation avec les données du formulaire.
// saveListener(id, listener || 'MESSAGE', data.prompt, data.reply) : Fonction pour enregistrer le listener dans l'automatisation.
// Formulaire :
// useZodForm : Utilise un hook personnalisé pour gérer le formulaire avec Zod pour la validation.
// errors : Objet contenant les erreurs de validation.
// onFormSubmit : Fonction pour gérer la soumission du formulaire.
// register : Fonction pour enregistrer les champs du formulaire.
// reset : Fonction pour réinitialiser le formulaire.
// watch : Fonction pour surveiller les valeurs des champs du formulaire.
// Fonctions :
// onSetListener : Une fonction pour définir le type de listener.
// Retour :
// Le hook retourne un objet avec les propriétés suivantes :
// onSetListener : Fonction pour définir le type de listener.
// register : Fonction pour enregistrer les champs du formulaire.
// onFormSubmit : Fonction pour gérer la soumission du formulaire.
// listener : État du listener.
// isPending : Indicateur de statut de la mutation.

export const useKeywords = (id: string) => {
  const [keyword, setKeyword] = useState("");
  const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setKeyword(e.target.value);

  const { mutate } = useMutationData(
    ["add-keyword"],
    (data: { keyword: string }) => saveKeyword(id, data.keyword),
    "automation-info",
    () => setKeyword("")
  );

  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      mutate({ keyword });
      setKeyword("");
    }
  };

  const { mutate: deleteMutation } = useMutationData(
    ["delete-keyword"],
    (data: { id: string }) => deleteKeyword(data.id),
    "automation-info"
  );

  return { keyword, onValueChange, onKeyPress, deleteMutation };
};
// Le hook useKeywords est utilisé pour gérer les mots-clés dans une automatisation. Voici ce que vous devez savoir :
// Paramètres :
// id : Identifiant unique de l'automatisation.
// État :
// keyword : Un état pour stocker la valeur actuelle du mot-clé.
// setKeyword : Une fonction pour mettre à jour l'état keyword.
// Fonctions :
// onValueChange : Une fonction pour gérer les changements de valeur dans l'input du mot-clé.
// onKeyPress : Une fonction pour gérer l'événement de touche "Enter" dans l'input du mot-clé, déclenchant la mutation pour ajouter le mot-clé.
// Mutations :
// Ajout de Mot-Clé :
// Utilise useMutationData pour gérer la mutation d'ajout d'un mot-clé.
// mutate : Fonction pour déclencher la mutation avec le mot-clé actuel.
// saveKeyword(id, data.keyword) : Fonction pour enregistrer le mot-clé dans l'automatisation.
// setKeyword('') : Réinitialise l'état keyword après l'ajout du mot-clé.
// Suppression de Mot-Clé :
// Utilise useMutationData pour gérer la mutation de suppression d'un mot-clé.
// deleteMutation : Fonction pour déclencher la mutation de suppression avec l'identifiant du mot-clé.
// deleteKeyword(data.id) : Fonction pour supprimer le mot-clé de l'automatisation.
// Retour :
// Le hook retourne un objet avec les propriétés suivantes :
// keyword : État du mot-clé.
// onValueChange : Fonction pour gérer les changements de valeur dans l'input.
// onKeyPress : Fonction pour gérer l'événement de touche "Enter".
// deleteMutation : Fonction pour déclencher la mutation de suppression.

export const useTriggers = (id: string) => {
  const types = useAppSelector(
    (state) => state.AutmationReducer.trigger?.types
  );

  const dispatch: AppDispatch = useDispatch();

  const onSetTrigger = (type: "COMMENT" | "DM") =>
    dispatch(TRIGGER({ trigger: { type } }));

  const { isPending, mutate } = useMutationData(
    ["add-trigger"],
    (data: { types: string[] }) => saveTrigger(id, data.types),
    "automation-info"
  );

  const onSaveTrigger = () => mutate({ types });
  return { types, onSetTrigger, onSaveTrigger, isPending };
};
// Le hook useTriggers est utilisé pour gérer les déclencheurs dans une automatisation. Voici ce que vous devez savoir :
// Paramètres :
// id : Identifiant unique de l'automatisation.
// État :
// types : Un tableau de types de déclencheurs récupéré à partir de l'état global de l'application via useAppSelector.
// Fonctions :
// onSetTrigger : Une fonction pour définir un type de déclencheur en utilisant dispatch pour envoyer une action Redux.
// onSaveTrigger : Une fonction pour déclencher la mutation d'ajout des déclencheurs avec les types actuels.
// Mutations :
// Ajout de Déclencheurs :
// Utilise useMutationData pour gérer la mutation d'ajout de déclencheurs.
// mutate : Fonction pour déclencher la mutation avec les types de déclencheurs actuels.
// saveTrigger(id, data.types) : Fonction pour enregistrer les déclencheurs dans l'automatisation.
// Retour :
// Le hook retourne un objet avec les propriétés suivantes :
// types : Tableau de types de déclencheurs.
// onSetTrigger : Fonction pour définir un type de déclencheur.
// onSaveTrigger : Fonction pour déclencher la mutation d'ajout des déclencheurs.
// isPending : Indicateur de statut de la mutation.
