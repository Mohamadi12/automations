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

// Le composant Items est utilisé pour afficher les éléments de navigation dans une barre latérale. Voici ce que vous devez savoir :
// Imports :
// Composants :
// Link : Un composant de next/link pour la navigation.
// Hooks et Fonctions :
// cn : Une fonction utilitaire pour combiner des classes CSS conditionnelles.
// Constantes :
// SIDEBAR_MENU : Une constante contenant les éléments de navigation.
// Props :
// page : Chaîne de caractères représentant la page actuelle.
// slug : Chaîne de caractères représentant l'identifiant de la page actuelle.
// Fonctionnement :
// Affichage des Éléments de Navigation :
// Le composant mappe sur SIDEBAR_MENU pour afficher chaque élément de navigation.
// Chaque élément est un lien (Link) avec une URL générée en fonction du slug et du label de l'élément.
// Les liens sont stylisés différemment en fonction de la page actuelle (page) et du slug.
// Si la page actuelle correspond au label de l'élément, le lien est mis en surbrillance avec un fond sombre (bg-[#0f0f0f]).
// Si la page actuelle correspond au slug et que l'élément est "home", le lien est également mis en surbrillance.
