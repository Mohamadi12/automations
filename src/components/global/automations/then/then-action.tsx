"use client";
import { useListener } from "@/hooks/use-automation";
import React from "react";
import TriggerButton from "../trigger-button";
import { AUTOMATION_LISTENERS } from "@/constants/automation";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Loader from "../../loader";
import { SubscriptionPlan } from "../../subscription-plan";
import { cn } from "@/lib/utils";

type Props = {
  id: string;
};

const ThenAction = ({ id }: Props) => {
  const {
    onFormSubmit,
    onSetListener,
    isPending,
    register,
    listener: Listener,
  } = useListener(id);
  return (
    <TriggerButton label="Then">
      <div className="flex flex-col gap-y-2 ">
        {AUTOMATION_LISTENERS.map((listener) =>
          listener.type === "SMARTAI" ? (
            <SubscriptionPlan key={listener.type} type="PRO">
              <div
                onClick={() => onSetListener(listener.type)}
                key={listener.id}
                className={cn(
                  Listener === listener.type
                    ? "bg-gradient-to-br from-[#3352CC] to-[#1C2D70]"
                    : "bg-background-80",
                  "p-3 rounded-xl flex flex-col gap-y-2 cursor-pointer hover:opacity-80 transition duration-100"
                )}
              >
                <div className="flex gap-x-2 items-center">
                  {listener.icon}
                  <p>{listener.label}</p>
                </div>
                <p>{listener.description}</p>
              </div>
            </SubscriptionPlan>
          ) : (
            <div
              onClick={() => onSetListener(listener.type)}
              key={listener.id}
              className={cn(
                Listener === listener.type
                  ? "bg-gradient-to-br from-[#3352CC] to-[#1C2D70]"
                  : "bg-background-80",
                "p-3 rounded-xl flex flex-col gap-y-2 cursor-pointer hover:opacity-80 transition duration-100"
              )}
            >
              <div className="flex gap-x-2 items-center">
                {listener.icon}
                <p>{listener.label}</p>
              </div>
              <p>{listener.description}</p>
            </div>
          )
        )}
        <form onSubmit={onFormSubmit} className="flex flex-col gap-y-2">
          <Textarea
            placeholder={
              Listener === "SMARTAI"
                ? "Add a prompt that your smart ai can use..."
                : "Add a message you want send to your customers"
            }
            {...register("prompt")}
            className="bg-background-80 outline-none border-none ring-0 focus:ring-0"
          />
          <Input
            {...register("reply")}
            placeholder="Add a reply for comments (Optional)"
            className="bg-background-80 outline-none border-none ring-0 focus:ring-0"
          />
          <Button className="bg-gradient-to-br w-full from-[#3352CC] font-medium text-white to-[#1C2D70]">
            <Loader state={isPending}>Add listener</Loader>
          </Button>
        </form>
      </div>
    </TriggerButton>
  );
};

export default ThenAction;

// useListener : Un hook personnalisé pour gérer les listeners d'automatisation.
// TriggerButton : Un composant pour encapsuler les boutons de déclenchement.
// Loader : Un composant pour afficher un indicateur de chargement.
// SubscriptionPlan : Un composant pour afficher du contenu conditionnellement en fonction du plan d'abonnement de l'utilisateur.
// AUTOMATION_LISTENERS : Une constante contenant les différents types de listeners d'automatisation.

// Props :
// id : Identifiant unique de l'automatisation.

// Fonctionnement :

// Récupération des Données :
// Le composant utilise useListener(id) pour récupérer les fonctions et les états nécessaires pour gérer les listeners d'automatisation.
// Affichage des Listeners :
// Pour chaque listener dans AUTOMATION_LISTENERS, le composant affiche un bouton pour sélectionner le listener.
// Si le listener est de type 'SMARTAI', il est encapsulé dans SubscriptionPlan pour afficher le contenu uniquement si l'utilisateur a un abonnement PRO.

// Formulaire de Configuration :
// Un formulaire est affiché pour configurer le prompt et la réponse associés au listener sélectionné.
// Le formulaire utilise onFormSubmit pour gérer la soumission et register pour enregistrer les champs.
// Le placeholder du Textarea change en fonction du type de listener sélectionné.

// Indicateur de Chargement :
// Un indicateur de chargement est affiché dans le bouton de soumission si isPending est vrai.
