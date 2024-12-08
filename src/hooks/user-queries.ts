import { getAllAutomations } from "@/actions/automations"
import { useQuery } from "@tanstack/react-query"


//Recuperation de toutes les données automations
export const useQueryAutomations = () => {
    return useQuery({
      queryKey: ['user-automations'],
      queryFn: getAllAutomations,
    })
  }