import {
  Sheet as ShadcnSheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import React from "react";

type Props = {
  trigger: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  side: "left" | "right";
};

const Sheet = ({ children, trigger, className, side }: Props) => {
  return (
    <ShadcnSheet>
      <SheetTrigger className={className}>{trigger}</SheetTrigger>
      <SheetContent side={side} className="p-0">
        {children}
      </SheetContent>
    </ShadcnSheet>
  );
};

export default Sheet;

//   ShadcnSheet : Structure principale du panneau.
// SheetTrigger : Déclenche l'ouverture du panneau.
// SheetContent : Contient contenu du panneau.
// side : Définit côté du panneau.
// className : Personnalise styles du panneau.
