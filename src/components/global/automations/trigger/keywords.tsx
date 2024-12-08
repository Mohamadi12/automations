import { Input } from "@/components/ui/input";
import { useKeywords } from "@/hooks/use-automation";
import { useMutationDataState } from "@/hooks/use-mutation-data";
import { useQueryAutomation } from "@/hooks/user-queries";

type Props = {
  id: string;
};

export const Keywords = ({ id }: Props) => {
  const { onValueChange, keyword, onKeyPress, deleteMutation } =
    useKeywords(id);
  const { latestVariable } = useMutationDataState(["add-keyword"]);
  const { data } = useQueryAutomation(id);

  return (
    <div className="bg-background-80 flex flex-col gap-y-3 p-3 rounded-xl">
      <p className="text-sm text-text-secondary">
        Add words that trigger automations
      </p>
      <div className="flex flex-wrap justify-start gap-2 items-center">
        {data?.data?.keywords &&
          data?.data?.keywords.length > 0 &&
          data?.data?.keywords.map(
            (word) =>
              word.id !== latestVariable.variables.id && (
                <div
                  className="bg-background-90 flex items-center gap-x-2 capitalize text-text-secondary py-1 px-4 rounded-full"
                  key={word.id}
                >
                  <p>{word.word}</p>
                </div>
              )
          )}
        {latestVariable && latestVariable.status === "pending" && (
          <div className="bg-background-90 flex items-center gap-x-2 capitalize text-text-secondary py-1 px-4 rounded-full">
            {latestVariable.variables.keyword}
          </div>
        )}
        <Input
          placeholder="Add keyword..."
          style={{
            width: Math.min(Math.max(keyword.length || 10, 2), 50) + "ch",
          }}
          value={keyword}
          className="p-0 bg-transparent ring-0 border-none outline-none"
          onChange={onValueChange}
          onKeyUp={onKeyPress}
        />
      </div>
    </div>
  );
};
export default Keywords;

// Le composant Keywords est utilisé pour afficher et gérer les mots-clés d'une automatisation
// useKeywords : Un hook personnalisé pour gérer les mots-clés.
// useMutationDataState : Un hook personnalisé pour récupérer l'état de la dernière mutation.
// useQueryAutomation : Un hook personnalisé pour récupérer les données de l'automatisation.
// Fonctionnement :
// Récupération des Données :
// Le composant utilise useQueryAutomation(id) pour récupérer les données de l'automatisation, y compris les mots-clés.
// useMutationDataState(['add-keyword']) est utilisé pour obtenir l'état de la dernière mutation d'ajout de mot-clé.
// Gestion des Mots-Clés :
// useKeywords(id) est utilisé pour obtenir les fonctions et les états nécessaires pour gérer les mots-clés.
// onValueChange : Fonction pour gérer les changements de valeur dans l'input du mot-clé.
// onKeyPress : Fonction pour gérer l'événement de touche "Enter" dans l'input du mot-clé, déclenchant la mutation pour ajouter le mot-clé.
// deleteMutation : Fonction pour déclencher la mutation de suppression d'un mot-clé.
// Affichage des Mots-Clés :
// Les mots-clés existants sont affichés sous forme de tags.
// Le mot-clé en cours d'ajout est affiché si la mutation est en attente.
// L'input pour ajouter un nouveau mot-clé est affiché avec une largeur dynamique basée sur la longueur du mot-clé.
