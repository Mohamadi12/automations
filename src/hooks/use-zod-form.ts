import { UseMutateFunction } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z, ZodSchema } from "zod";

const useZodForm = (
  schema: ZodSchema,
  mutation: UseMutateFunction,
  defaultValues?: any
) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      ...defaultValues,
    },
  });

  const onFormSubmit = handleSubmit(async (values) => mutation({ ...values }));
  return {
    register,
    errors,
    onFormSubmit,
    watch,
    reset,
  };
};

export default useZodForm;

// Le hook useZodForm est utilisé pour intégrer la validation de formulaires avec Zod et la gestion des formulaires avec react-hook-form. Voici ce que vous devez savoir :

// Imports :

// Types et Fonctions :

// UseMutateFunction : Un type de @tanstack/react-query pour les fonctions de mutation.

// zodResolver : Un resolver pour react-hook-form qui utilise Zod pour la validation.

// useForm : Un hook de react-hook-form pour gérer les formulaires.

// z, ZodSchema : Des types et fonctions de Zod pour définir et valider des schémas.

// Paramètres :

// schema : Un schéma de validation Zod pour le formulaire.

// mutation : Une fonction de mutation pour traiter les données du formulaire.

// defaultValues (optionnel) : Valeurs par défaut pour les champs du formulaire.

// Fonctionnement :

// Initialisation du Formulaire :

// Le hook utilise useForm avec zodResolver(schema) pour associer le schéma de validation Zod au formulaire.

// Les valeurs par défaut sont passées au formulaire via defaultValues.

// Gestion du Formulaire :

// register : Fonction pour enregistrer les champs du formulaire.

// errors : Objet contenant les erreurs de validation.

// handleSubmit : Fonction pour gérer la soumission du formulaire.

// watch : Fonction pour surveiller les valeurs des champs du formulaire.

// reset : Fonction pour réinitialiser le formulaire.

// Soumission du Formulaire :

// onFormSubmit : Une fonction de soumission qui appelle mutation avec les valeurs du formulaire après validation.

// Retour :

// Le hook retourne un objet avec les propriétés suivantes :

// register : Fonction pour enregistrer les champs du formulaire.

// errors : Objet contenant les erreurs de validation.

// onFormSubmit : Fonction de soumission du formulaire.

// watch : Fonction pour surveiller les valeurs des champs du formulaire.

// reset : Fonction pour réinitialiser le formulaire.
