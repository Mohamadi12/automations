import { getAllAutomations, getAutomationInfo, getProfilePosts } from "@/actions/automations";
import { onUserInfo } from "@/actions/user";
import { useQuery } from "@tanstack/react-query";

//Recuperation de toutes les données automations
export const useQueryAutomations = () => {
  return useQuery({
    queryKey: ["user-automations"],
    queryFn: getAllAutomations,
  });
};

//Recuperation les données d'une automation specifique
export const useQueryAutomation = (id: string) => {
  return useQuery({
    queryKey: ["automation-info"],
    queryFn: () => getAutomationInfo(id),
  });
};

//Le hook useQueryUser est utilisé pour récupérer les informations de l'utilisateur dans une application
export const useQueryUser = () => {
  return useQuery({
    queryKey: ["user-profile"],
    queryFn: onUserInfo,
  });
};


// Le hook useQueryAutomationPosts est utilisé pour récupérer les publications d'un profil Instagram
export const useQueryAutomationPosts = () => {
  const fetchPosts = async () => await getProfilePosts()
  return useQuery({
    queryKey: ['instagram-media'],
    queryFn: fetchPosts,
  })
}