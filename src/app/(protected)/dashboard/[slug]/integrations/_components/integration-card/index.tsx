"use client";

import { onOAuthInstagram } from "@/actions/integrations";
import { onUserInfo } from "@/actions/user";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import React from "react";

type Props = {
  title: string;
  description: string;
  icon: React.ReactNode;
  strategy: "INSTAGRAM" | "CRM";
};

const IntegrationCard = ({ description, icon, strategy, title }: Props) => {
  const onInstaOAuth = () => onOAuthInstagram(strategy);

  const { data } = useQuery({
    queryKey: ["user-profile"],
    queryFn: onUserInfo,
  });

  const integrated = data?.data?.integrations.find(
    (integration) => integration.name === strategy
  );

  return (
    <div className="border-2 border-[#3352CC] rounded-2xl gap-x-5 p-5 flex items-center justify-between">
      {icon}
      <div className="flex flex-col flex-1">
        <h3 className="text-xl"> {title}</h3>
        <p className="text-[#9D9D9D] text-base ">{description}</p>
      </div>
      <Button
        onClick={onInstaOAuth}
        disabled={integrated?.name === strategy}
        className="bg-gradient-to-br text-white rounded-full text-lg from-[#3352CC] font-medium to-[#1C2D70] hover:opacity-70 transition duration-100"
      >
        {integrated ? "Connected" : "Connect"}
      </Button>
    </div>
  );
};

export default IntegrationCard;

// Le composant IntegrationCard est utilisé pour afficher une carte d'intégration avec une option de connexion. Voici ce que vous devez savoir :
// Imports :
// Composants :
// Button : Un composant de bouton personnalisé.
// Hooks et Fonctions :
// useQuery : Un hook de @tanstack/react-query pour gérer les requêtes de données.
// onOAuthInstagram, onUserInfo : Des fonctions pour gérer l'authentification OAuth et récupérer les informations de l'utilisateur.
// Props :
// title : Titre de la carte d'intégration.
// description : Description de la carte d'intégration.
// icon : Icône de la carte d'intégration.
// strategy : Stratégie d'intégration ('INSTAGRAM' ou 'CRM').
// Fonctionnement :
// Récupération des Données :
// Le composant utilise useQuery pour récupérer les informations de l'utilisateur (onUserInfo).
// Affichage de la Carte d'Intégration :
// Affiche une carte avec une icône, un titre, une description et un bouton de connexion.
// Le bouton de connexion est désactivé si l'intégration est déjà connectée (integrated?.name === strategy).
// Le texte du bouton change en fonction de l'état de l'intégration ('Connected' si connecté, 'Connect' sinon).
// Gestion de l'Authentification OAuth :
// La fonction onInstaOAuth est appelée lorsque le bouton est cliqué pour gérer l'authentification OAuth avec la stratégie spécifiée.
