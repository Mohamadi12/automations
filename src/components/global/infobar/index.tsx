"use client";

import { PAGE_BREAD_CRUMBS } from "@/constants/pages";
import { usePaths } from "@/hooks/user-nav";
import React from "react";
import Sheet from "../sheet";
import { Menu } from "lucide-react";
import { LogoSmall } from "@/svg/logo-small";
import Items from "../sidebar/items";
import { Separator } from "@/components/ui/separator";
import ClerkAuthState from "../clerk-auth-state";
import { HelpDuoToneWhite } from "@/icons";
import UpgradeCard from "../sidebar/upgrade";
import CreateAutomation from "../create-automation";
import Search from "./search";
import Notifications from "./notifications";
import MainBreadCrumb from "../bread-crumbs/main-bread-crumb";
import { SubscriptionPlan } from "../subscription-plan";

type Props = {
  slug: string;
};

const InfoBar = ({ slug }: Props) => {
  const { page } = usePaths();
  const currentPage = PAGE_BREAD_CRUMBS.includes(page) || page == slug;
  return (
    currentPage && (
      <div className="flex flex-col">
        <div className="flex gap-x-3 lg:gap-x-5 justify-end">
          <span className="lg:hidden flex items-center flex-1 gap-x-2">
            <Sheet trigger={<Menu />} className="lg:hidden" side="left">
              <div className="flex flex-col gap-y-5 w-full h-full p-3 bg-[#0e0e0e] bg-opacity-90 bg-clip-padding backdrop-filter backdrop--blur__safari backdrop-blur-3xl">
                <div className="flex gap-x-2 items-center p-5 justify-center">
                  <LogoSmall />
                </div>
                <div className="flex flex-col py-3">
                  <Items page={page} slug={slug} />
                </div>
                <div className="px-16">
                  <Separator
                    orientation="horizontal"
                    className="bg-[#333336]"
                  />
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
            </Sheet>
          </span>
          <Search />
          <CreateAutomation />
          <Notifications />
        </div>
        <MainBreadCrumb page={page === slug ? "Home" : page} slug={slug} />
      </div>
    )
  );
};

export default InfoBar;

// Le composant InfoBar est utilisé pour afficher une barre d'informations dans une application React avec Next.js. Voici ce que vous devez savoir :
// Imports :
// Composants :
// Menu, Separator : Des icônes de lucide-react pour la navigation et la séparation visuelle.
// Sheet : Un composant pour afficher un menu déroulant.
// Items, ClerkAuthState, HelpDuoToneWhite, SubscriptionPlan, UpgradeCard, LogoSmall, CreateAutomation, Search, Notifications, MainBreadCrumb : Des composants pour afficher différentes fonctionnalités et informations.
// Hooks et Fonctions :
// usePaths : Un hook personnalisé pour récupérer le chemin actuel de l'URL.
// Constantes :
// PAGE_BREAD_CRUMBS : Une constante contenant les pages pour lesquelles la barre d'informations doit être affichée.
// Props :
// slug : Chaîne de caractères représentant l'identifiant de la page actuelle.
// Fonctionnement :
// Récupération des Données :
// Le composant utilise usePaths() pour récupérer le chemin actuel de l'URL.
// Affichage Conditionnel :
// Le composant affiche la barre d'informations uniquement si la page actuelle est dans PAGE_BREAD_CRUMBS ou si le slug correspond à la page actuelle.
// Barre d'Informations :
// Affiche un menu déroulant (Sheet) pour les appareils mobiles avec des options de navigation, un bouton de recherche, un bouton pour créer une nouvelle automatisation, et un bouton pour afficher les notifications.
// Affiche un fil d'Ariane (MainBreadCrumb) pour indiquer la page actuelle.
