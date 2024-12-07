import { SIDEBAR_MENU } from "@/constants/menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

type Props = {
  page: string;
  slug: string;
};

const Items = ({ page, slug }: Props) => {
  return SIDEBAR_MENU.map((item) => (
    <Link
      key={item.id}
      href={`/dashboard/${slug}/${item.label === "home" ? "/" : item.label}`}
      className={cn(
        "capitalize flex gap-x-2 rounded-full p-3",
        page === item.label && "bg-[#0f0f0f]",
        page === slug && item.label === "home"
          ? "bg-[#0f0f0f]"
          : "text-[#9B9CA0]"
      )}
    >
      {item.icon}
      {item.label}
    </Link>
  ));
};

export default Items;


// SIDEBAR_MENU : Liste des éléments du menu.
// cn : Utilitaire pour gestion des classes.
// Link : Création de liens dynamiques.
// page : Détermine la page active.
// slug : Paramètre dynamique de l'URL.
// map : Parcours du menu pour items.
// bg-[#0f0f0f] : Couleur de fond active.
// capitalize : Mise en majuscule des labels.
// flex : Disposition flexible pour items.
// rounded-full : Bordures arrondies pour éléments.
