import { getAllAutomations, getAutomationInfo } from "@/actions/automations"
import { useQuery } from "@tanstack/react-query"


//Recuperation de toutes les données automations
export const useQueryAutomations = () => {
    return useQuery({
      queryKey: ['user-automations'],
      queryFn: getAllAutomations,
    })
  }

  //Recuperation les données d'une automation specifique
  export const useQueryAutomation = (id: string) => {
    return useQuery({
      queryKey: ['automation-info'],
      queryFn: () => getAutomationInfo(id),
    })
  }