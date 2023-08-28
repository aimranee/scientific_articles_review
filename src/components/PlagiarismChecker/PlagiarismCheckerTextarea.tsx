import { type FC, type ChangeEvent } from "react";
import HighlightedText from "../HighlightedText";
import { useBoundStore } from "@/zustand/useBoundStore";
import Highlighter from "react-highlight-words";
import ExampleTextButton from "../ExampleTextButton";
import { ChecksProps } from "@/interfaces";
import Textarea from "../Textarea";
import isDesktopView from "@/utils/isDesktopView";
import { useState } from "react";

interface PlagiarismCheckerTextareaProps {
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  setTextToCheck: (text: string) => void;
}

const getSearchWords = (checks: ChecksProps) => {
  return [
    `\\b(${checks?.checksList?.map((check) => check.result[0]).join("|")})\\b`,
    "gi",
  ];
};
const EXAMPLE_TEXT =
  "Le dragon est une créature légendaire représentée comme une sorte de gigantesque reptile, ailes déployées et pattes armées de griffes.";

const PlagiarismCheckerTextarea: FC<PlagiarismCheckerTextareaProps> = ({
  onChange,
  setTextToCheck,
}) => {
  const { checks, value } = useBoundStore();
  const [textValue, setTextValue] = useState("");
  return (
    <div className="relative w-full px-5">
      <div
        className="!text-transparent caret-white absolute inset-0 bg-transparent w-full max-h-[250px] md:max-h-[500px] h-max md:h-screen outline-none resize-none p-5 text-base lg:text-lg"
        spellCheck={false}
      >
        <Highlighter
          searchWords={getSearchWords(checks)}
          autoEscape={false}
          textToHighlight={value}
          highlightTag={HighlightedText}
          caseSensitive={true}
        />
      </div>
      <Textarea
        onChange={onChange}
        value={value}
        name="text"
        className="relative md:!max-h-[500px] !bg-transparent !p-0 !pt-5 !pl-0"
        autofocus={isDesktopView()}
      />
      {value.length <= 0 && (
        <ExampleTextButton
          exampleText={EXAMPLE_TEXT}
          additionalSetState={setTextToCheck}
          className="text-pink-500 hover:text-pink-600 dark:text-pink-400 dark:hover:text-pink-500"
        />
      )}
    </div>
  );
};

export default PlagiarismCheckerTextarea;
