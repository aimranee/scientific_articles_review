import {  Languages } from "@/enums.d";
import {
  FromLanguageProps,
  TranslatorProps,
  FromText,
  TranslatedText,
} from "@/interfaces.d";
import { StateCreator } from "zustand";

interface TranslatorMethodsProps {
  setFromLanguage: (language: FromLanguageProps) => void;
  setToLanguage: (language: Languages) => void;
  setFromText: (text: FromText) => void;
  setTranslatedText: (text: TranslatedText) => void;
  switchLanguages: () => void;
  clearTranslation: () => void;
}

export interface TranslatorSlice
  extends TranslatorProps,
    TranslatorMethodsProps {}

const initialState = {
  fromLanguage: Languages.ENGLISH,
  toLanguage: Languages.FRENCH,
  fromText: "",
  translatedText: "",
};

export const createTranslatorSlice: StateCreator<TranslatorSlice> = (set) => ({
  ...initialState,
  setFromLanguage: (language) => set({ fromLanguage: language }),
  setToLanguage: (language) => set({ toLanguage: language }),
  setFromText: (text) => set({ fromText: text }),
  setTranslatedText: (text) => set({ translatedText: text }),
  switchLanguages: () => {
    return set((state) => {
      const newState: TranslatorProps = {
        fromLanguage: state.toLanguage,
        toLanguage: state.fromLanguage,
        fromText: state.translatedText,
        translatedText: state.fromText,
      };
      return newState;
    });
  },
  clearTranslation: () => set(initialState),
});
