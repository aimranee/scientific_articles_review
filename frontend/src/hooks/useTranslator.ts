import { useEffect } from "react";
import { useBoundStore } from "@/zustand/useBoundStore";
import { useChatGPT } from "./useChatGPT";
import axios from "axios";
// import * as deep:l from "deepl-node";

import { Languages, ResponseProperties } from "@/enums.d";
import {
  createSystemMessage,
  createUserMessage,
} from "@/prompts/translatorPrompt";
import type { TranslationProps } from "@/interfaces";

export const useTranslator = () => {
  const {
    fromLanguage,
    setFromLanguage,
    fromText,
    setFromText,
    toLanguage,
    setToLanguage,
    translation,
    setTranslation,
    switchLanguages,
  } = useBoundStore();
  // const { addChatGPTMessage, loading } = useChatGPT({
  //   initialPrompt: createSystemMessage(),
  //   customProperty: ResponseProperties.TRANSLATION,
  //   customSetState: setTranslation
  // })
  import * as DeepL from "unofficial-deepl-client";
  const token = process.env.DEEPL_AUTH_KEY ?? "";
  const deepL = new DeepL.WebClient(token);
  const translator = new DeepL.Translator(`${process.env.DEEPL_AUTH_KEY}`);

  useEffect(() => {
    console.log("test1");

    if (fromText?.length <= 1) return;
    const timeout = setTimeout(async () => {
      console.log("test2");

      try {
        const response = await translator.translateText(
          fromText,
          fromLanguage,
          toLanguage
        );
        console.log(response);
        console.log(translator.translateText);

        // if (response.status === 200) {
        //   // Assuming your API response has a 'result' field containing the translation
        //   console.log("ressss" + response.data.msg);
        // } else {
        //   console.error("Error:", response.statusText);
        //   // Handle error as needed
        // }
      } catch (error) {
        console.error("Error:", error);
        // Handle error as needed
      }
      console.log("test3");
      //
      const translatedTextCleared: TranslationProps = {
        ...translation,
        translatedText: "",
      };
      setTranslation(translatedTextCleared);
      // setTranslation(response.data.result);

      // const userMessage = createUserMessage({ fromText, fromLanguage, toLanguage })
      // addChatGPTMessage(userMessage)
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [fromText]);

  const onFromLanguageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFromText(e.target.value);
  };

  const handleFromLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const language = e.target.value as Languages;
    setFromLanguage(language);
  };

  const handleToLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const language = e.target.value as Languages;
    setToLanguage(language);
  };

  return {
    fromLanguage,
    handleFromLanguage,
    toLanguage,
    handleToLanguage,
    onFromLanguageChange,
    translation,
    fromText,
    setFromText,
    switchLanguages,
    // loading,
  };
};
