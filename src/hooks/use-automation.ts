import { createAutomations, updateAutomationName } from "@/actions/automations";
import { useMutationData } from "./use-mutation-data";
import { useEffect, useRef, useState } from "react";

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
  const [edit, setEdit] = useState(false)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const enableEdit = () => setEdit(true)
  const disableEdit = () => setEdit(false)

  const { isPending, mutate } = useMutationData(
    ['update-automation'],
    (data: { name: string }) =>
      updateAutomationName(automationId, { name: data.name }),
    'automation-info',
    disableEdit
  )

  useEffect(() => {
    function handleClickOutside(this: Document, event: MouseEvent) {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node | null)
      ) {
        if (inputRef.current.value !== '') {
          mutate({ name: inputRef.current.value })
        } else {
          disableEdit()
        }
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return {
    edit,
    enableEdit,
    disableEdit,
    inputRef,
    isPending,
  }
}

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