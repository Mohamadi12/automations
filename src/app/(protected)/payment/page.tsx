import { onSubscribe } from "@/actions/user";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  searchParams: {
    session_id?: string;
    cancel?: boolean;
  };
};

const Page = async ({ searchParams: { cancel, session_id } }: Props) => {
  if (session_id) {
    const customer = await onSubscribe(session_id);

    if (customer.status === 200) {
      return redirect("/dashboard");
    }

    return (
      <div className="flex flex-col justify-center items-center h-screen w-full">
        <h4 className="text-5xl font-bold">404</h4>
        <p className="text-xl font-bold">Oppse! Something went wrong</p>
      </div>
    );
  }

  if (cancel) {
    return (
      <div className='"flex flex-col justify-center items-center h-screen w-full"'>
        <h4 className="text-5xl font-bold">404</h4>
        <p className="text-xl font-bold">Oppse! Something went wrong</p>
      </div>
    );
  }
};

export default Page;

//   Le composant Page est utilisé pour gérer la redirection après une session de paiement Stripe. Voici ce que vous devez savoir :
// Imports :
// Fonctions :
// onSubscribe : Une fonction pour gérer l'abonnement d'un utilisateur via Stripe.
// redirect : Une fonction de next/navigation pour rediriger l'utilisateur.
// Props :
// searchParams : Un objet contenant les paramètres de l'URL, ici session_id (optionnel) et cancel (optionnel).
// Fonctionnement :
// Gestion de la Session Stripe :
// Si session_id est présent, le composant appelle onSubscribe(session_id) pour gérer l'abonnement de l'utilisateur.
// Si l'abonnement est réussi (customer.status === 200), l'utilisateur est redirigé vers /dashboard.
// Si l'abonnement échoue, un message d'erreur est affiché.
// Gestion de l'Annulation :
// Si cancel est true, un message d'erreur est affiché indiquant que l'opération a été annulée.
