import { getAllAutomations, getAutomationInfo } from "@/actions/automations";
import { onUserInfo } from "@/actions/user";
import { QueryClient, QueryFunction } from "@tanstack/react-query";

const prefetch = async (
  client: QueryClient, //client: une instance de QueryClient de react-query.
  action: QueryFunction, //action: une fonction (de type QueryFunction) pour exécuter une requête de données.
  key: string //key: une clé pour identifier cette requête.
) => {
  //La méthode prefetchQuery du client QueryClient est utilisée pour préparer (mettre en cache) une requête avant qu'elle ne soit réellement nécessaire.
  return await client.prefetchQuery({
    queryKey: [key], //Une clé unique (key) est spécifiée pour identifier cette requête dans le cache.
    queryFn: action, //La fonction action est définie comme la fonction qui va être exécutée pour récupérer les données (par exemple, une fonction API).
    staleTime: 60000,
  });
};



//Une fonction asynchrone exportée est définie pour précharger les données du profil utilisateur.
export const PrefetchUserProfile = async (client: QueryClient) => {
  //La fonction onUserInfo (qui récupère les informations utilisateur) et La clé 'user-profile' pour identifier cette requête.
  return await prefetch(client, onUserInfo, "user-profile");
};



//Une fonction asynchrone exportée est définie pour précharger les données du profil utilisateur.
export const PrefetchUserAutnomations = async (client: QueryClient) => {
  //La fonction getAllAutomations (qui récupère les informations automatiques) et La clé 'user-automations' pour identifier cette requête.
  return await prefetch(client, getAllAutomations, "user-automations");
};



//Utilise prefetch pour précharger les informations d'une automatisation spécifique dans le cache de react-query.
export const PrefetchUserAutomation = async (
  client: QueryClient,
  automationId: string
) => {
  //Fonction qui récupère les informations de l'automatisation specifique
  return await prefetch(
    client,
    () => getAutomationInfo(automationId),
    "automation-info"
  );
};
