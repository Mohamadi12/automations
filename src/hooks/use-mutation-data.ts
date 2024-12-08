import {
  MutationFunction,
  MutationKey,
  useMutation,
  useMutationState,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

export const useMutationData = (
  mutationKey: MutationKey,
  mutationFn: MutationFunction<any, any>,
  queryKey?: string,
  onSuccess?: () => void
) => {
  const client = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey,
    mutationFn,
    onSuccess: (data) => {
      if (onSuccess) onSuccess();
      return toast(data?.status === 200 ? "Success" : "Error", {
        description: data.data,
      });
    },
    onSettled: async () => {
      await client.invalidateQueries({ queryKey: [queryKey] });
    },
  });

  return { mutate, isPending };
};

//   Paramètres :
// mutationKey : Clé unique pour identifier la mutation.
// mutationFn : Fonction qui effectue la mutation (par exemple, une requête HTTP).
// queryKey (optionnel) : Clé de la requête associée pour invalider les données après la mutation.
// onSuccess (optionnel) : Fonction à exécuter en cas de succès de la mutation.
// Utilisation de useMutation :
// Le hook utilise useMutation de react-query pour gérer la mutation.
// onSuccess : Appelle onSuccess si fourni, puis affiche un toast avec un message de succès ou d'erreur en fonction du statut de la réponse.
// onSettled : Invalide les requêtes associées à queryKey après la mutation pour s'assurer que les données sont mises à jour.
// Retour :
// Le hook retourne un objet avec deux propriétés :
// mutate : Fonction pour déclencher la mutation.
// isPending : Booléen indiquant si la mutation est en cours.

export const useMutationDataState = (mutationKey: MutationKey) => {
  const data = useMutationState({
    filters: { mutationKey },
    select: (mutation) => {
      return {
        variables: mutation.state.variables as any,
        status: mutation.state.status,
      };
    },
  });

  const latestVariable = data[data.length - 1];
  return { latestVariable };
};

// Paramètre :
// mutationKey : Clé unique pour identifier la mutation dont vous souhaitez récupérer l'état.
// Utilisation de useMutationState :
// Ce hook utilise useMutationState de react-query pour obtenir l'état des mutations correspondant à la clé fournie.
// filters: { mutationKey } : Filtre les mutations par la clé spécifiée.
// select : Fonction de sélection pour extraire les variables et le statut de la mutation.
// Retour :
// Le hook retourne un objet avec une propriété :
// latestVariable : Les dernières variables et le statut de la dernière mutation correspondant à la clé.
