import { ChangeEvent, useState, type FC } from "react";
import type { LanguageSectionProps } from "@/interfaces";
import TextareaWrapper from "../TextareaWrapper";
import LanguageSelector from "./LanguageSelector";
import TextareaFooter from "../TextareaFooter";
import CopyButton from "../CopyButton";
import Textarea from "../Textarea";
import ExampleTextButton from "../ExampleTextButton";
import isDesktopView from "@/utils/isDesktopView";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const EXAMPLE_TEXT =
  "The sun was setting behind the mountains as the weary travelers finally reached the end of their long journey. They set up camp and cooked a simple meal before falling into a deep sleep under the starry sky.";

const FromLanguage: FC<LanguageSectionProps> = ({
  onSelectChange,
  languageSelectorValue,
  options,
  textareaOnchange,
  setFromText,
}) => {
  const router = useRouter();
  const { data } = router.query;
  const setText = data ? data.toString() : "";
  const [textValue, setTextValue] = useState("");

  useEffect(() => {
    setTextValue(setText);
    if (setFromText) setFromText(setText);
  }, []);

  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newTextValue = e.target.value;
    textareaOnchange(e);
    if (setFromText) setFromText(newTextValue);
    setTextValue(newTextValue);
  };

  return (
    <TextareaWrapper>
      <LanguageSelector
        onSelectChange={onSelectChange}
        selectName="from-languages"
        value={languageSelectorValue}
        options={options}
      />
      <Textarea
        value={textValue}
        onChange={handleTextareaChange}
        name="fromLanguage"
        autofocus={isDesktopView()}
      />
      {textValue.length <= 0 && (
        <ExampleTextButton
          exampleText={EXAMPLE_TEXT}
          className="top-[105px] text-orange-500 hover:text-orange-400 dark:text-orange-500 dark:hover:text-orange-600"
          additionalSetState={setFromText}
        />
      )}
      <TextareaFooter>
        <CopyButton text={textValue} />
      </TextareaFooter>
    </TextareaWrapper>
  );
};

export default FromLanguage;
