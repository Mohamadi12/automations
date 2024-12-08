"use client";

import { Separator } from "@/components/ui/separator";
import { useQueryAutomation } from "@/hooks/user-queries";
import { PlaneBlue, SmartAi, Warning } from "@/icons";
import PostButton from "../post";

type Props = {
  id: string;
};

const ThenNode = ({ id }: Props) => {
  const { data } = useQueryAutomation(id);
  const commentTrigger = data?.data?.trigger.find((t) => t.type === "COMMENT");

  return !data?.data?.listener ? (
    <></>
  ) : (
    <div className="w-full lg:w-10/12 relative xl:w-6/12 p-5 rounded-xl flex flex-col bg-[#1D1D1D] gap-y-3">
      <div className="absolute h-20 left-1/2 bottom-full flex flex-col items-center z-50">
        <span className="h-[9px] w-[9px] bg-connector/10 rounded-full" />
        <Separator
          orientation="vertical"
          className="bottom-full flex-1 border-[1px] border-connector/10"
        />
        <span className="h-[9px] w-[9px] bg-connector/10 rounded-full" />
      </div>
      <div className="flex gap-x-2">
        <Warning />
        Then...
      </div>
      <div className="bg-background-80 p-3 rounded-xl flex flex-col gap-y-2">
        <div className="flex gap-x-2 items-center">
          {data.data.listener.listener === "MESSAGE" ? (
            <PlaneBlue />
          ) : (
            <SmartAi />
          )}
          <p className=" text-lg">
            {data.data.listener.listener === "MESSAGE"
              ? "Send the user a message."
              : "Let Smart AI take over"}
          </p>
        </div>
        <p className="flont-light text-text-secondary">
          {data.data.listener.prompt}
        </p>
      </div>
      {data.data.posts.length > 0 ? (
        <></>
      ) : commentTrigger ? (
        <PostButton id={id} />
      ) : (
        <></>
      )}
    </div>
  );
};

export default ThenNode;

//   Le composant ThenNode est utilisé pour afficher les actions à effectuer après un déclencheur dans une automatisation. Voici ce que vous devez savoir :
// Imports :
// Composants :
// Separator : Un composant pour afficher une séparation visuelle.
// PlaneBlue, SmartAi, Warning : Des icônes pour représenter différents types de listeners.
// PostButton : Un composant pour gérer les publications.
// Hooks et Fonctions :
// useQueryAutomation : Un hook personnalisé pour récupérer les données de l'automatisation.
// Props :
// id : Identifiant unique de l'automatisation.
// Fonctionnement :
// Récupération des Données :
// Le composant utilise useQueryAutomation(id) pour récupérer les données de l'automatisation, y compris les déclencheurs et les listeners.
// Affichage Conditionnel :
// Si l'automatisation n'a pas de listener, le composant ne rend rien.
// Sinon, il affiche les détails du listener actif avec une icône et une description différentes en fonction du type de listener ('MESSAGE' ou 'SMARTAI').
// Il affiche également le prompt associé au listener.
// Gestion des Publications :
// Si l'automatisation a des publications, il n'affiche rien.
// Si l'automatisation a un déclencheur de type 'COMMENT' mais pas de publications, il affiche le composant PostButton pour gérer les publications.
