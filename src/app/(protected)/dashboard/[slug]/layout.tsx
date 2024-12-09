import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import InfoBar from "@/components/global/infobar";
import Sidebar from "@/components/global/sidebar";
import React from "react";
import {
  PrefetchUserAutnomations,
  PrefetchUserProfile,
} from "@/react-query/prefetch";

type Props = {
  children: React.ReactNode;
  params: { slug: string };
};

const Layout = async ({ children, params }: Props) => {
  const query = new QueryClient();

  await PrefetchUserProfile(query);

  await PrefetchUserAutnomations(query);

  return (
    <HydrationBoundary state={dehydrate(query)}>
      <div className="p-3">
        <Sidebar slug={params.slug} />
        <div className="lg:ml-[250px] lg:pl-10 lg:py-5 flex flex-col overflow-auto">
          <InfoBar slug={params.slug} />
          {children}
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default Layout;

// Le composant Layout est utilisé pour structurer la mise en page d'une application React avec Next.js et react-query. Voici ce que vous devez savoir :
// Imports :
// Composants :
// HydrationBoundary, QueryClient, dehydrate : Des composants et fonctions de @tanstack/react-query pour gérer le cache et la réhydratation.
// InfoBar, Sidebar : Des composants pour afficher la barre d'informations et la barre latérale.
// Fonctions :
// PrefetchUserProfile, PrefetchUserAutnomations : Des fonctions pour précharger les données de l'utilisateur et les automatisations.
// Props :
// children : Contenu à afficher dans la mise en page.
// params : Objet contenant les paramètres de l'URL, ici slug qui est utilisé pour personnaliser la barre latérale et la barre d'informations.
// Fonctionnement :
// Préchargement des Données :
// Le composant utilise QueryClient pour créer une instance de client de requête.
// PrefetchUserProfile(query) est appelé pour précharger les données du profil utilisateur.
// PrefetchUserAutnomations(query) est appelé pour précharger les données des automatisations de l'utilisateur.
// Rendu :
// Le composant utilise HydrationBoundary pour réhydrater les données préchargées.
// La mise en page comprend une barre latérale (Sidebar) et une barre d'informations (InfoBar) personnalisées avec le slug.
// Le contenu principal (children) est affiché à l'intérieur de cette mise en page.
