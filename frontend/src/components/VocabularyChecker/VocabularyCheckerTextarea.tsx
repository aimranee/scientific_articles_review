import { type FC, type ChangeEvent } from "react";
import HighlightedText from "../HighlightedText";
import { useBoundStore } from "@/zustand/useBoundStore";
import Highlighter from "react-highlight-words";
import ExampleTextButton from "../ExampleTextButton";
import { CorrectionsProps } from "@/interfaces";
import Textarea from "../Textarea";
import isDesktopView from "@/utils/isDesktopView";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

interface VocabularyCheckerTextareaProps {
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  setTextToCorrect: (text: string) => void;
}

const getSearchWords = (corrections: CorrectionsProps) => {
  return [
    `\\b(${corrections?.correctionsList
      ?.map((correction) => correction.result[0])
      .join("|")})\\b`,
    "gi",
  ];
};

const EXAMPLE_TEXT =
  "A medical procedure that is used to remove (ablate) or destroy the endometrial lining of a uterus.";

const VocabularyCheckerTextarea: FC<VocabularyCheckerTextareaProps> = ({
  onChange,
  setTextToCorrect,
}) => {

  const { corrections, value, setValue } = useBoundStore();
  const router = useRouter();
  const { data } = router.query;
  const setText = data ? data.toString() : "";

  useEffect(() => {
    setValue(setText);
    setTextToCorrect(setText);
  }, []);

  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newTextValue = e.target.value;
    onChange(e);
    setTextToCorrect(newTextValue);
    setValue(newTextValue);
  };

  return (
    <div className="relative w-full px-5">
      <div
        className="!text-transparent caret-white absolute inset-0 bg-transparent w-full max-h-[250px] md:max-h-[500px] h-max md:h-screen outline-none resize-none p-5 text-base lg:text-lg"
        spellCheck={false}
      >
        <Highlighter
          searchWords={getSearchWords(corrections)}
          autoEscape={false}
          textToHighlight={value}
          highlightTag={HighlightedText}
          caseSensitive={true}
        />
      </div>
      <Textarea
        onChange={handleTextareaChange}
        value={value}
        name="text"
        className="relative md:!max-h-[500px] !bg-transparent !p-0 !pt-5 !pl-0"
        autofocus={isDesktopView()}
      />
      {value.length <= 0 && (
        <ExampleTextButton
          exampleText={EXAMPLE_TEXT}
          additionalSetState={setTextToCorrect}
          className="text-green-500 hover:text-green-600 dark:text-green-400 dark:hover:text-green-500"
        />
      )}
    </div>
  );
};

export default VocabularyCheckerTextarea;
