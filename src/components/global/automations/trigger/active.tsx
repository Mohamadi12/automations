import { InstagramBlue, PlaneBlue } from "@/icons";
import React from "react";

type Props = {
  type: string;
  keywords: {
    id: string;
    word: string;
    automationId: string | null;
  }[];
};

const ActiveTrigger = ({ keywords, type }: Props) => {
  return (
    <div className="bg-background-80 p-3 rounded-xl w-full">
      <div className="flex gap-x-2 items-center">
        {type === "COMMENT" ? <InstagramBlue /> : <PlaneBlue />}
        <p className="text-lg">
          {type === "COMMENT"
            ? "User comments on my post."
            : "User sends me a direct message."}
        </p>
      </div>
      <p className="text-text-secondary">
        {type === "COMMENT"
          ? "If the user comments on a video that is setup to listen for keyworks, this automation will fire"
          : "If the user send your a message that contains a keyword, this automation will fire"}
      </p>
      <div className="flex  ga-2 mt-5 flex-wrap">
        {keywords.map((word) => (
          <div
            key={word.id}
            className="bg-gradient-to-br from-[#3352CC] to-[#1C2D70] flex items-center gap-x-2 capitalize text-white font-light py-1 px-4 rounded-full"
          >
            <p>{word.word}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveTrigger;

// Le composant ActiveTrigger est utilisé pour afficher les détails d'un déclencheur actif dans une automatisation. Voici ce que vous devez savoir :

// Imports :

// Icônes :

// InstagramBlue, PlaneBlue : Des icônes pour représenter différents types de déclencheurs.

// Props :

// type : Type de déclencheur ('COMMENT' ou 'DM').

// keywords : Un tableau d'objets représentant les mots-clés associés au déclencheur, avec des propriétés id, word, et automationId.

// Fonctionnement :

// Affichage Conditionnel :

// Selon le type de déclencheur (type), le composant affiche une icône différente (InstagramBlue pour 'COMMENT' et PlaneBlue pour 'DM').

// Le texte descriptif change également en fonction du type de déclencheur.

// Affichage des Mots-Clés :

// Les mots-clés associés au déclencheur sont affichés sous forme de tags avec un style spécifique.
