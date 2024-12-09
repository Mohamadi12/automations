import { stripe } from "@/lib/stripe";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  const user = await currentUser();
  if (!user) return NextResponse.json({ status: 404 });

  const priceId = process.env.STRIPE_SUBSCRIPTION_PRICE_ID;

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_HOST_URL}/payment?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_HOST_URL}/payment?cancel=true`,
  });
  if (session) {
    return NextResponse.json({
      status: 200,
      session_url: session.url,
    });
  }

  return NextResponse.json({ status: 400 });
}

//   La fonction GET est une fonction asynchrone utilisée pour créer une session de paiement Stripe pour un utilisateur. Voici ce que vous devez savoir :
// Imports :

// Fonctions et Objets :
// stripe : Une instance de Stripe pour interagir avec l'API Stripe.
// currentUser : Une fonction de @clerk/nextjs/server pour obtenir l'utilisateur actuel.
// NextResponse : Un objet de next/server pour retourner des réponses HTTP.
// Fonctionnement :
// Vérification de l'Utilisateur :
// La fonction commence par appeler currentUser() pour obtenir l'utilisateur actuel.
// Si aucun utilisateur n'est connecté, elle retourne une réponse JSON avec un statut 404.
// Création de la Session Stripe :
// Elle utilise stripe.checkout.sessions.create pour créer une nouvelle session de paiement Stripe.
// mode: 'subscription' : Spécifie que la session est pour un abonnement.
// line_items : Définit les articles à inclure dans la session, ici un abonnement avec un prix spécifique (priceId) et une quantité de 1.
// success_url : URL de redirection après un paiement réussi, incluant l'ID de session Stripe.
// cancel_url : URL de redirection si l'utilisateur annule le paiement.
// Gestion de la Réponse :
// Si la session est créée avec succès, elle retourne une réponse JSON avec un statut 200 et l'URL de la session.
// Si la création de la session échoue, elle retourne une réponse JSON avec un statut 400.
// Retour :
// La fonction retourne une réponse JSON avec un statut HTTP (200, 404, ou 400) et éventuellement l'URL de la session Stripe.
