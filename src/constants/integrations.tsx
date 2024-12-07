import { InstagramDuoToneBlue, SalesForceDuoToneBlue } from "@/icons"

type Props = {
  title: string
  icon: React.ReactNode
  description: string
  strategy: 'INSTAGRAM' | 'CRM'
}

export const INTEGRATION_CARDS: Props[] = [
  {
    title: 'Connect Instagram',
    description:
      'Lorem ipsum dolor sit amet consectetur. Mauris scelerisque tincidunt ultrices',
    icon: <InstagramDuoToneBlue />,
    strategy: 'INSTAGRAM',
    
  },
  {
    title: 'Connect Salesforce',
    description:
      'Lorem ipsum dolor sit amet consectetur. Mauris scelerisque tincidunt ultrices',
    icon: <SalesForceDuoToneBlue />,
    strategy: 'CRM',
  },
]

// INTEGRATION_CARDS : Cartes d'intégration pour services.
// title : Titre de l'intégration.
// icon : Icône représentant l'intégration.
// description : Description de l'intégration.
// strategy : Type de stratégie (INSTAGRAM, CRM).