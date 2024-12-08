import { useQueryUser } from '@/hooks/user-queries'
import React from 'react'

type Props = {
    type: 'FREE' | 'PRO'
    children: React.ReactNode
}

export const SubscriptionPlan = ({ children, type }: Props) => {
  const { data } = useQueryUser()
  return data?.data?.subscription?.plan === type && children
}


// Récupération des Données : Utilise useQueryUser pour récupérer les informations de l'utilisateur, y compris le plan d'abonnement.

// Affichage Conditionnel : Affiche le contenu children uniquement si le plan d'abonnement de l'utilisateur correspond au type spécifié.