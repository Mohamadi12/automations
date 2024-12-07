import { cn } from "@/lib/utils";
import React from "react";
import { Spinner } from "./spinner";

type Props = {
  state: boolean;
  className?: string;
  children: React.ReactNode;
  color?: string;
};

const Loader = ({ children, className, color, state }: Props) => {
  return state ? (
    <div className={cn(className)}>
      <Spinner color={color} />
    </div>
  ) : (
    children
  );
};

export default Loader;

// Spinner : Affiche une animation chargement.
// state : Détermine affichage chargement/enfants.
// cn(className) : Ajoute styles personnalisés dynamiquement.
// children : Contenu affiché si non-chargement.
// color : Couleur personnalisable pour spinner.
