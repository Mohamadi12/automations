import { onIntegrate } from "@/actions/integrations";
import { redirect } from "next/navigation";

type Props = {
  searchParams: {
    code: string;
  };
};

const Page = async ({ searchParams: { code } }: Props) => {
  if (code) {
    const user = await onIntegrate(code.split("#_")[0]);
    if (user.status === 200) {
      return redirect(
        `/dashboard/${user.data?.firstname}${user.data?.lastname}/integrations`
      );
    }
  }
  return redirect("/sign-up");
};

export default Page;

// Objectif :
// Cette fonction est une page Next.js qui gère l'intégration d'un utilisateur en utilisant un code d'autorisation. Elle redirige l'utilisateur vers le tableau de bord approprié après une intégration réussie.
// Paramètres :
// searchParams (objet) : Contient les paramètres de recherche de l'URL, notamment le code d'autorisation.
// Action :
// Vérification du code d'autorisation :
// La fonction vérifie si un code est présent dans les paramètres de recherche.
// Traitement du code d'autorisation :
// Si un code est présent, la fonction le récupère et le traite en supprimant tout suffixe (par exemple, #_).
// Intégration de l'utilisateur :
// La fonction appelle la fonction onIntegrate avec le code traité pour intégrer l'utilisateur.
// Redirection après intégration réussie :
// Si l'intégration est réussie (user.status === 200), la fonction redirige l'utilisateur vers le tableau de bord des intégrations, en utilisant le prénom et le nom de l'utilisateur.
// Redirection par défaut :
// Si aucun code n'est présent ou si l'intégration échoue, la fonction redirige l'utilisateur vers la page d'inscription (/sign-up).
