"use client";

import { Button } from "@/components/ui/button";
import React, { useMemo } from "react";
import Loader from "../loader";
import { AutomationDuoToneWhite } from "@/icons";
import { useCreateAutomation } from "@/hooks/use-automation";
import { v4 } from "uuid";

const CreateAutomation = () => {
  const mutationId = useMemo(() => v4(), []);
  //Creation the automation in the db using mutate
  const { isPending, mutate } = useCreateAutomation();

  return (
    <Button
      className="lg:px-10 py-6 bg-gradient-to-br hover:opacity-80 text-white rounded-full from-[#3352CC] font-medium to-[#1C2D70]"
      onClick={() =>
        mutate({
          name: "Untitled",
          id: mutationId,
          createdAt: new Date(),
          keywords: [],
        })
      }
    >
      <Loader state={isPending}>
        <AutomationDuoToneWhite />
        <p className="lg:inline hidden">Create an Automation</p>
      </Loader>
    </Button>
  );
};

export default CreateAutomation;

// Génération d'ID :
// mutationId est généré une seule fois avec useMemo pour garantir un identifiant unique.
// Utilisation de useCreateAutomation :
// Ce hook retourne deux propriétés :
// isPending : Un booléen indiquant si la création est en cours.
// mutate : Une fonction pour déclencher la création de l'automatisation.
// Rendu :
// Le composant retourne un bouton stylisé avec un gradient de couleurs.
// Lorsque le bouton est cliqué, la fonction mutate est appelée avec les détails de l'automatisation à créer :
// name : "Untitled" (nom par défaut).
// id : L'identifiant unique généré.
// createdAt : La date actuelle.
// keywords : Une liste vide de mots-clés.
// Le composant Loader affiche un indicateur de chargement si isPending est vrai, sinon il affiche l'icône et le texte "Create an Automation".
