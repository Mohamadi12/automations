import { Button } from "@/components/ui/button";
import React from "react";
import { ActiveAutomation } from "@/icons/active-automation";
import { useQueryAutomation } from "@/hooks/user-queries";
import { useMutationData } from "@/hooks/use-mutation-data";
import { Loader2 } from "lucide-react";
import { activateAutomation } from "@/actions/automations";

type Props = {
  id: string;
};

const ActivateAutomationButton = ({ id }: Props) => {
  const { data } = useQueryAutomation(id);
  const { mutate, isPending } = useMutationData(
    ["activate"],
    (data: { state: boolean }) => activateAutomation(id, data.state),
    "automation-info"
  );

  return (
    <Button
      disabled={isPending}
      onClick={() => mutate({ state: !data?.data?.active })}
      className="lg:px-10 bg-gradient-to-br hover:opacity-80 text-white rounded-full from-[#3352CC] font-medium to-[#1C2D70] ml-4"
    >
      {isPending ? <Loader2 className="animate-spin" /> : <ActiveAutomation />}

      <p className="lg:inline hidden">
        {data?.data?.active ? "Disable" : "Activate"}
      </p>
    </Button>
  );
};

export default ActivateAutomationButton;

// Le composant ActivateAutomationButton est utilisé pour activer ou désactiver une automatisation. Voici ce que vous devez savoir :

// Composants :
// Button : Un composant de bouton personnalisé.
// Loader : Un composant pour afficher un indicateur de chargement.
// ActiveAutomation : Une icône pour représenter l'activation de l'automatisation.
// Loader2 : Une icône de lucide-react pour l'animation de chargement.
// Hooks et Fonctions :
// useQueryAutomation : Un hook personnalisé pour récupérer les données de l'automatisation.
// useMutationData : Un hook personnalisé pour gérer les mutations.
// activateAutomation : Une fonction pour activer ou désactiver une automatisation.

// Props :
// id : Identifiant unique de l'automatisation.

// Fonctionnement :
// Récupération des Données :
// Le composant utilise useQueryAutomation(id) pour récupérer les données de l'automatisation, y compris l'état d'activation.
// Gestion de la Mutation :
// useMutationData est utilisé pour gérer la mutation d'activation ou de désactivation de l'automatisation.

// mutate : Fonction pour déclencher la mutation avec l'état inverse de l'automatisation actuelle.
// Affichage Conditionnel :
// Le bouton affiche un indicateur de chargement (Loader2) si une opération est en cours (isPending).
// Sinon, il affiche l'icône ActiveAutomation.
// Le texte du bouton change en fonction de l'état actuel de l'automatisation ('Disable' si activé, 'Activate' si désactivé).
