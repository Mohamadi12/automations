import { duplicateValidation } from "@/lib/utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type IntialStateTriggerProps = {
  trigger?: {
    type?: "COMMENT" | "DM";
    keyword?: string;
    types?: string[];
    keywords?: string[];
  };
};

const InitialState: IntialStateTriggerProps = {
  trigger: {
    type: undefined,
    keyword: undefined,
    types: [],
    keywords: [],
  },
};

export const AUTOMATION = createSlice({
  name: "automation",
  initialState: InitialState,
  reducers: {
    TRIGGER: (state, action: PayloadAction<IntialStateTriggerProps>) => {
      state.trigger!.types = duplicateValidation(
        state.trigger?.types!,
        action.payload.trigger?.type!
      );
      return state;
    },
  },
});

export const { TRIGGER } = AUTOMATION.actions;
export default AUTOMATION.reducer;

// Fonctions Utilitaires :
// duplicateValidation : Une fonction pour valider et éviter les doublons.
// Redux Toolkit :
// createSlice : Une fonction pour créer un slice Redux.
// PayloadAction : Un type pour définir les actions Redux.
// Types :
// IntialStateTriggerProps : Un type pour définir l'état initial du déclencheur, incluant les propriétés type, keyword, types, et keywords.
// État Initial :
// InitialState : L'état initial du slice, avec des valeurs par défaut pour les propriétés du déclencheur.
// Slice :
// Nom : Le slice est nommé 'automation'.
// Reducers :
// TRIGGER : Un reducer qui met à jour l'état du déclencheur en utilisant duplicateValidation pour éviter les doublons dans le tableau types.
// Actions :
// TRIGGER : L'action associée au reducer TRIGGER.
// Exportation :
// Le reducer est exporté par défaut pour être utilisé dans le store Redux.
