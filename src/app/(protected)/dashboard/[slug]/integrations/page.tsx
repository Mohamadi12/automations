import React from "react";
import IntegrationCard from "./_components/integration-card";
import { INTEGRATION_CARDS } from "@/constants/integrations";

const Page = () => {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col w-full lg:w-8/12 gap-y-5">
        {INTEGRATION_CARDS.map((card, key) => (
          <IntegrationCard key={key} {...card} />
        ))}
      </div>
    </div>
  );
};

export default Page;

// Fonctionnalités principales :
// Page : Affiche une liste de cartes d'intégration.
// INTEGRATION_CARDS : Tableau d'objets contenant des informations sur les intégrations (comme Instagram, Salesforce).
// IntegrationCard : Composant affichant une carte pour chaque intégration.
// Structure :
// Le composant Page mappe sur INTEGRATION_CARDS.
// Chaque carte est rendue par le composant IntegrationCard.
// Les cartes sont disposées en colonne et centrées dans un conteneur flex.
