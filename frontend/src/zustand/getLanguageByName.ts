import { languageData } from "./languageData";

export function getLanguageByName(name: string) {
  const foundLanguage = languageData.find(
    (entry) => entry.name.toLowerCase() === name.toLowerCase()
  );

  if (foundLanguage) {
    return foundLanguage.language;
  } else {
    return "Language not found";
  }
}
