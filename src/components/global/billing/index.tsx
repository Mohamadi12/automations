"use client";

import React from "react";
import PaymentCard from "./payment-card";
import { useQueryUser } from "@/hooks/user-queries";

const Billing = () => {
  const { data } = useQueryUser();
  return (
    <div className="flex lg:flex-row flex-col gap-5 w-full lg:w-10/12 xl:w-8/12 container">
      <PaymentCard current={data?.data?.subscription?.plan!} label="PRO" />
      <PaymentCard current={data?.data?.subscription?.plan!} label="FREE" />
    </div>
  );
};

export default Billing;

// Le composant Billing est utilisé pour afficher les options de facturation (abonnements) disponibles pour un utilisateur. Voici ce que vous devez savoir :
// Imports :
// Composants :
// PaymentCard : Un composant pour afficher une carte d'abonnement.
// Hooks et Fonctions :
// useQueryUser : Un hook personnalisé pour récupérer les données de l'utilisateur.
// Fonctionnement :
// Récupération des Données :
// Le composant utilise useQueryUser() pour récupérer les données de l'utilisateur, y compris le plan d'abonnement actuel.
// Affichage des Options de Facturation :
// Le composant affiche deux cartes d'abonnement (PaymentCard) pour les plans PRO et FREE.
// Chaque carte reçoit le plan d'abonnement actuel de l'utilisateur (current) et le label du plan (label).
