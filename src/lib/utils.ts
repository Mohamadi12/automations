import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getMonth = (month: number) => {
  const months: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  if (month < 1 || month > 12) {
    return 'Invalid month number. Please enter a number between 1 and 12.'
  }

  return months[month - 1]
}

export const duplicateValidation = (arr: string[], el: string) => {
  if (!arr.find((t) => t === el)) {
    arr.push(el)
    return arr
  } else {
    arr = arr.filter((t) => t !== el)
    return arr
  }
}

// La fonction duplicateValidation est utilisée pour valider et gérer les doublons dans un tableau de chaînes de caractères. Voici ce que vous devez savoir :

// Paramètres :

// arr : Un tableau de chaînes de caractères à valider.

// el : La chaîne de caractères à ajouter ou à retirer du tableau.

// Fonctionnement :

// Vérification des Doublons :

// La fonction vérifie si el est déjà présent dans le tableau arr.

// Si el n'est pas présent, il est ajouté au tableau.

// Si el est déjà présent, il est retiré du tableau.

// Retour :

// La fonction retourne le tableau arr mis à jour.