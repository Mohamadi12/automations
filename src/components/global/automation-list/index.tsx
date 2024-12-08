"use client";

import { usePaths } from "@/hooks/user-nav";
import { cn, getMonth } from "@/lib/utils";
import Link from "next/link";
import React, { useMemo } from "react";
import GradientButton from "../gradient-button";
import { Button } from "@/components/ui/button";
import { useQueryAutomations } from "@/hooks/user-queries";
import CreateAutomation from "../create-automation";
import { useMutationDataState } from "@/hooks/use-mutation-data";

const AutomationList = () => {
  const { data } = useQueryAutomations(); //Recuperer les data des automation

  const { latestVariable } = useMutationDataState(["create-automation"]); //Recuperer la dernière creation d'automation à travers la Key
  const { pathname } = usePaths(); //La selection des url

  const optimisticUiData = useMemo(() => {
    if (latestVariable && latestVariable?.variables && data) {
      const test = [latestVariable.variables, ...data.data];
      return { data: test };
    }
    return data || { data: [] };
  }, [latestVariable, data]);

  if (data?.status !== 200 || data.data.length <= 0) {
    //Presente le button creation si la condition n'est pas vraie
    return (
      <div className="h-[70vh] flex justify-center items-center flex-col gap-y-3">
        <h3 className="text-lg text-gray-400">No Automations </h3>
        <CreateAutomation />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-3">
      {optimisticUiData.data!.map((automation) => (
        <Link
          href={`${pathname}/${automation.id}`} //Changer les url en fonction des données
          key={automation.id}
          className="bg-[#1D1D1D] hover:opacity-80 transition duration-100 rounded-xl p-5 border-[1px] radial--gradient--automations flex border-[#545454]"
        >
          <div className="flex flex-col flex-1 items-start">
            <h2 className="text-xl font-semibold">{automation.name}</h2>
            <p className="text-[#9B9CA0] text-sm font-light mb-2">
              This is from the comment
            </p>

            {automation.keywords.length > 0 ? (
              <div className="flex gap-x-2 flex-wrap mt-3">
                {
                  //@ts-ignore
                  automation.keywords.map((keyword, key) => (
                    <div
                      key={keyword.id}
                      className={cn(
                        "rounded-full px-4 py-1 capitalize",
                        (0 + 1) % 1 == 0 &&
                          "bg-keyword-green/15 border-2 border-keyword-green",
                        (1 + 1) % 2 == 0 &&
                          "bg-keyword-purple/15 border-2 border-keyword-purple",
                        (2 + 1) % 3 == 0 &&
                          "bg-keyword-yellow/15 border-2 border-keyword-yellow",
                        (3 + 1) % 4 == 0 &&
                          "bg-keyword-red/15 border-2 border-keyword-red"
                      )}
                    >
                      {keyword.word}
                    </div>
                  ))
                }
              </div>
            ) : (
              <div className="rounded-full border-2 mt-3 border-dashed border-white/60 px-3 py-1">
                <p className="text-sm text-[#bfc0c3]">No Keywords</p>
              </div>
            )}
          </div>
          <div className="flex flex-col justify-between">
            <p className="capitalize text-sm font-light text-[#9B9CA0]">
              {getMonth(automation.createdAt.getUTCMonth() + 1)}{" "}
              {automation.createdAt.getUTCDate() === 1
                ? `${automation.createdAt.getUTCDate()}st`
                : `${automation.createdAt.getUTCDate()}th`}{" "}
              {automation.createdAt.getUTCFullYear()}
            </p>

            {automation.listener?.listener === "SMARTAI" ? (
              <GradientButton
                type="BUTTON"
                className="w-full bg-background-80 text-white hover:bg-background-80"
              >
                Smart AI
              </GradientButton>
            ) : (
              <Button className="bg-background-80 hover:bg-background-80 text-white">
                Standard
              </Button>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default AutomationList;

// Hooks et Fonctions Utilitaires :
// usePaths : Un hook personnalisé pour récupérer le chemin actuel de l'URL.
// cn et getMonth : Des fonctions utilitaires pour la gestion des classes CSS et la conversion des mois.
// useQueryAutomations : Un hook personnalisé pour récupérer la liste des automatisations.
// useMutationDataState : Un hook personnalisé pour récupérer l'état de la dernière mutation de création d'automatisation.

// Composants :
// Link : Un composant Next.js pour la navigation.
// GradientButton et Button : Des composants de boutons personnalisés.
// CreateAutomation : Un composant pour créer une nouvelle automatisation.

// Fonctionnement :
// Récupération des Données :
// Le composant utilise useQueryAutomations pour récupérer les données des automatisations.
// useMutationDataState est utilisé pour obtenir l'état de la dernière mutation de création d'automatisation.

// Optimistic UI :
// useMemo est utilisé pour créer une version optimiste des données en combinant les données actuelles avec les dernières variables de mutation.

// Affichage Conditionnel :
// Si les données ne sont pas disponibles ou si la liste est vide (data?.status !== 200 || data.data.length <= 0), un message "No Automations" est affiché avec un bouton pour créer une nouvelle automatisation.

// Affichage de la Liste des Automatisations :
// Pour chaque automatisation dans optimisticUiData.data, un lien est créé avec les détails suivants :
// Nom de l'Automatisation : Affiche le nom de l'automatisation.

// Commentaire : Un texte générique "This is from the comment".

// Mots-Clés : Si l'automatisation contient des mots-clés, ils sont affichés sous forme de tags avec des styles différents en fonction de leur position.

// Date de Création : La date de création est formatée avec le mois, le jour et l'année.

// Type de Listener : Un bouton indique si l'automatisation utilise "Smart AI" ou "Standard".
