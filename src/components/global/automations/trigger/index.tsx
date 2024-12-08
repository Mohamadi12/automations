"use client";

import { useQueryAutomation } from "@/hooks/user-queries";
import React from "react";
import ActiveTrigger from "./active";
import { Separator } from "@/components/ui/separator";
import ThenAction from "../then/then-action";
import Keywords from "./keywords";
import { Button } from "@/components/ui/button";
import Loader from "../../loader";
import { cn } from "@/lib/utils";
import TriggerButton from "../trigger-button";
import { AUTOMATION_TRIGGERS } from "@/constants/automation";
import { useTriggers } from "@/hooks/use-automation";

type Props = {
  id: string;
};

const Trigger = ({ id }: Props) => {
  const { types, onSetTrigger, onSaveTrigger, isPending } = useTriggers(id);
  const { data } = useQueryAutomation(id);

  if (data?.data && data?.data?.trigger.length > 0) {
    return (
      <div className="flex flex-col ga-y-6 items-center">
        <ActiveTrigger
          type={data.data.trigger[0].type}
          keywords={data.data.keywords}
        />

        {data?.data?.trigger.length > 1 && (
          <>
            <div className="relative w-6/12 my-4">
              <p className="absolute transform  px-2 -translate-y-1/2 top-1/2 -translate-x-1/2 left-1/2">
                or
              </p>
              <Separator
                orientation="horizontal"
                className="border-muted border-[1px]"
              />
            </div>
            <ActiveTrigger
              type={data.data.trigger[1].type}
              keywords={data.data.keywords}
            />
          </>
        )}

        {!data.data.listener && <ThenAction id={id} />}
      </div>
    );
  }
  return (
    <TriggerButton label="Add Trigger">
      <div className="flex flex-col gap-y-2">
        {AUTOMATION_TRIGGERS.map((trigger) => (
          <div
            key={trigger.id}
            onClick={() => onSetTrigger(trigger.type)}
            className={cn(
              "hover:opacity-80 text-white rounded-xl flex cursor-pointer flex-col p-3 gap-y-2",
              !types?.find((t) => t === trigger.type)
                ? "bg-background-80"
                : "bg-gradient-to-br from-[#3352CC] font-medium to-[#1C2D70]"
            )}
          >
            <div className="flex gap-x-2 items-center">
              {trigger.icon}
              <p className="font-bold">{trigger.label}</p>
            </div>
            <p className="text-sm font-light">{trigger.description}</p>
          </div>
        ))}
        <Keywords id={id} />
        <Button
          onClick={onSaveTrigger}
          disabled={types?.length === 0}
          className="bg-gradient-to-br from-[#3352CC] font-medium text-white to-[#1C2D70]"
        >
          <Loader state={isPending}>Create Trigger</Loader>
        </Button>
      </div>
    </TriggerButton>
  );
};

export default Trigger;

// Hooks et Fonctions :
// useQueryAutomation : Un hook personnalisé pour récupérer les données de l'automatisation.
// useTriggers : Un hook personnalisé pour gérer les déclencheurs.
// cn : Une fonction utilitaire pour combiner des classes CSS conditionnelles.
// Composants :
// ActiveTrigger : Un composant pour afficher les détails d'un déclencheur actif.
// Separator : Un composant pour afficher une séparation visuelle.
// ThenAction : Un composant pour configurer les actions après un déclencheur.
// Keywords : Un composant pour gérer les mots-clés.
// Button : Un composant de bouton personnalisé.
// Loader : Un composant pour afficher un indicateur de chargement.
// TriggerButton : Un composant pour encapsuler les boutons de déclenchement.
// Constantes :
// AUTOMATION_TRIGGERS : Une constante contenant les différents types de déclencheurs d'automatisation.
// Props :
// id : Identifiant unique de l'automatisation.
// Fonctionnement :
// Récupération des Données :
// Le composant utilise useQueryAutomation(id) pour récupérer les données de l'automatisation, y compris les déclencheurs.
// useTriggers(id) est utilisé pour obtenir les fonctions et les états nécessaires pour gérer les déclencheurs.
// Affichage Conditionnel :
// Si l'automatisation a des déclencheurs, le composant affiche les détails des déclencheurs actifs avec ActiveTrigger.
// Si l'automatisation a plus d'un déclencheur, il affiche une séparation visuelle et les détails du deuxième déclencheur.
// Si l'automatisation n'a pas de listener, il affiche le composant ThenAction pour configurer les actions après le déclencheur.
// Ajout de Déclencheurs :
// Si l'automatisation n'a pas de déclencheurs, le composant affiche une liste de boutons pour ajouter des déclencheurs.
// Les boutons sont stylisés différemment en fonction de leur état sélectionné.
// Le composant Keywords est affiché pour gérer les mots-clés.
// Un bouton "Create Trigger" est affiché pour enregistrer les déclencheurs sélectionnés, avec un indicateur de chargement si une opération est en cours.
