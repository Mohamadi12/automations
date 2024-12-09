"use client";

import { usePaths } from "@/hooks/user-nav";
import { LogoSmall } from "@/svg/logo-small";
import React from "react";
import Items from "./items";
import { Separator } from "@/components/ui/separator";
import ClerkAuthState from "../clerk-auth-state";
import { HelpDuoToneWhite } from "@/icons";
import UpgradeCard from "./upgrade";
import { SubscriptionPlan } from "../subscription-plan";

type Props = {
  slug: string;
};

const Sidebar = ({ slug }: Props) => {
  const { page } = usePaths();

  return (
    <div
      className="w-[250px] 
    border-[1px]
    radial 
    fixed 
    left-0 
    lg:inline-block
    border-[#545454] 
    bg-gradient-to-b from-[#768BDD] 
    via-[#171717]
     to-[#768BDD] 
     hidden 
     bottom-0 
     top-0 
     m-3 
     rounded-3xl 
     overflow-hidden"
    >
      <div
        className="flex flex-col 
      gap-y-5
       w-full 
       h-full 
       p-3 
       bg-[#0e0e0e] 
       bg-opacity-90 
       bg-clip-padding 
       backdrop-filter 
       backdrop--blur__safari 
       backdrop-blur-3xl"
      >
        <div className="flex gap-x-2 items-center p-5 justify-center">
          <LogoSmall />
        </div>
        <div className="flex flex-col py-3">
          <Items page={page} slug={slug} />
        </div>
        <div className="px-16">
          <Separator orientation="horizontal" className="bg-[#333336]" />
        </div>
        <div className="px-3 flex flex-col gap-y-5">
          <div className="flex gap-x-2">
            <ClerkAuthState />
            <p className="text-[#9B9CA0]">Profile</p>
          </div>
          <div className="flex gap-x-3">
            <HelpDuoToneWhite />
            <p className="text-[#9B9CA0]">Help</p>
          </div>
        </div>
        <SubscriptionPlan type="FREE">
          <div className="flex-1 flex flex-col justify-end">
            <UpgradeCard />
          </div>
        </SubscriptionPlan>
      </div>
    </div>
  );
};

export default Sidebar;

// Le composant Sidebar est utilisé pour afficher une barre latérale dans une application React avec Next.js. Voici ce que vous devez savoir :
// Imports :
// Composants :
// Separator : Un composant pour afficher une séparation visuelle.
// ClerkAuthState, HelpDuoToneWhite, SubscriptionPlan, UpgradeCard, LogoSmall : Des composants pour afficher différentes fonctionnalités et informations.
// Items : Un composant pour afficher les éléments de navigation.
// Hooks et Fonctions :
// usePaths : Un hook personnalisé pour récupérer le chemin actuel de l'URL.
// Props :
// slug : Chaîne de caractères représentant l'identifiant de la page actuelle.
// Fonctionnement :
// Récupération des Données :
// Le composant utilise usePaths() pour récupérer le chemin actuel de l'URL.
// Affichage de la Barre Latérale :
// Affiche une barre latérale fixe avec un fond dégradé et un arrière-plan semi-transparent.
// Affiche le logo de l'application (LogoSmall).
// Affiche les éléments de navigation (Items) avec le chemin actuel et le slug.
// Affiche une séparation visuelle (Separator).
// Affiche des options de profil (ClerkAuthState) et d'aide (HelpDuoToneWhite).
// Affiche une option d'upgrade (UpgradeCard) conditionnellement en fonction du plan d'abonnement (SubscriptionPlan).
