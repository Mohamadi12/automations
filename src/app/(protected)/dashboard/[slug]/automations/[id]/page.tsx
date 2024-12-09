import { getAutomationInfo } from '@/actions/automations'
import PostNode from '@/components/global/automations/post/node'
import ThenNode from '@/components/global/automations/then/node'
import Trigger from '@/components/global/automations/trigger'
import AutomationsBreadCrumb from '@/components/global/bread-crumbs/automations'
import { Warning } from '@/icons'
import { PrefetchUserAutomation } from '@/react-query/prefetch'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import React from 'react'

type Props = {
  params: { id: string }
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const info = await getAutomationInfo(params.id)
  return {
    title: info.data?.name,
  }
}

const Page = async ({ params }: Props) => {
  const query = new QueryClient()
  await PrefetchUserAutomation(query, params.id)

  return (
    <HydrationBoundary state={dehydrate(query)}>
      <div className=" flex flex-col items-center gap-y-20">
        <AutomationsBreadCrumb id={params.id} />
        <div className="w-full lg:w-10/12 xl:w-6/12 p-5 rounded-xl flex flex-col bg-[#1D1D1D] gap-y-3">
          <div className="flex gap-x-2">
            <Warning />
            When...
          </div>
          <Trigger id={params.id} />
        </div>
        <ThenNode id={params.id} />
        <PostNode id={params.id} />
      </div>
    </HydrationBoundary>
  )
}

export default Page



// Le composant Page est utilisé pour afficher les détails d'une automatisation spécifique dans une application React avec Next.js. Voici ce que vous devez savoir :

// Imports :

// Actions et Composants :

// getAutomationInfo : Une fonction pour récupérer les informations d'une automatisation.

// Trigger : Affiche et gérer les déclencheurs d'une automatisation, permettant aux utilisateurs de sélectionner et d'ajouter de nouveaux déclencheurs.
// AutomationsBreadCrumb : Affiche un fil d'Ariane pour une automatisation spécifique, permettant à l'utilisateur d'éditer le nom de l'automatisation et d'activer/désactiver l'automatisation.
// PostNode : Affiche les publications associées à une automatisation.
// ThenNode : Affiche les actions à effectuer après un déclencheur dans une automatisation.

// Hooks et Fonctions :

// PrefetchUserAutomation : Une fonction pour précharger les données de l'automatisation dans le cache de react-query.

// dehydrate, HydrationBoundary, QueryClient : Des fonctions et composants de @tanstack/react-query pour gérer le cache et la réhydratation.

// Fonctionnement :

// Génération des Métadonnées :

// generateMetadata : Une fonction asynchrone qui récupère les informations de l'automatisation pour générer les métadonnées de la page (par exemple, le titre).

// Préchargement des Données :

// PrefetchUserAutomation : Précharge les données de l'automatisation dans le cache de react-query avant le rendu de la page.

// Rendu :

// Le composant utilise HydrationBoundary pour réhydrater les données préchargées.

// Affiche un fil d'Ariane (AutomationsBreadCrumb), un composant Trigger, ThenNode, et PostNode pour représenter les différentes parties de l'automatisation.