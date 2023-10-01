import { useEffect } from "react";
import { useBoundStore } from "@/zustand/useBoundStore";
import axios from "axios";
import { Languages } from "@/enums.d";
import { getLanguageByName } from "@/zustand/getLanguageByName";

export const useTranslator = () => {
  const {
    fromLanguage,
    setFromLanguage,
    fromText,
    setFromText,
    toLanguage,
    setToLanguage,
    translatedText,
    setTranslatedText,
    switchLanguages,
    loading,
  } = useBoundStore();

  useEffect(() => {
    if (fromText?.length <= 1) return;
    const frLng = getLanguageByName(fromLanguage);
    const toLng = getLanguageByName(toLanguage);
    const timeout = setTimeout(async () => {
      try {
        const response = await axios.post(
          `${process.env.PATH_BACK}/translate`,
          {
            text: fromText,
            source_lang: frLng,
            target_lang: toLng,
          }
        );

        if (response.status === 200) {
          const data = response.data;
          setTranslatedText(data.result);
        }
      } catch (error) {
        console.error(error);
      }
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
    translatedText,
    fromText,
    setFromText,
    switchLanguages,
    loading,
  };
};
