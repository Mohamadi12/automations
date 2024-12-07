import { PAGE_ICON } from "@/constants/pages";
import React from "react";

type Props = {
  page: string;
  slug?: string;
};

const MainBreadCrumb = ({ page, slug }: Props) => {
  return (
    <div className="flex flex-col items-start">
      {page === "Home" && (
        <div className="flex justify-center w-full">
          <div className="radial--gradient w-4/12 py-5 lg:py-10 flex flex-col items-center">
            <p className="text-text-secondary text-lg">Welcome back</p>
            <h2 className="capitalize text-4xl font-medium">{slug}!</h2>
          </div>
        </div>
      )}
      <span className="radial--gradient inline-flex py-5 lg:py-10 pr-16 gap-x-2 items-center">
        {PAGE_ICON[page.toUpperCase()]}
        <h2 className="font-semibold text-3xl capitalize">{page}</h2>
      </span>
    </div>
  );
};

export default MainBreadCrumb;


// Objectif :

// Afficher un fil d'Ariane (breadcrumb) ou une bannière personnalisée en fonction de la page courante (page) et d'un paramètre additionnel optionnel (slug).
// Comportement pour "Home" :

// Montre une bannière de bienvenue avec un gradient radiale et un message personnalisé (utilise la valeur de slug).
// Comportement pour les autres pages :

// Affiche une ligne avec :
// Une icône dynamique (via PAGE_ICON).
// Le nom de la page, stylisé et capitalisé.
// Utilisation de constantes :

// PAGE_ICON mappe des icônes spécifiques à chaque page, récupérées dynamiquement.
// Structure et style :

// Utilise des classes CSS utilitaires (comme flex, gradient) pour une mise en page moderne et responsive.
// Propriétés (Props) :

// page (obligatoire) : Détermine la logique et le contenu.
// slug (optionnel) : Ajoute une personnalisation pour certaines pages (comme "Home").