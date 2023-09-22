import { type FC, type ChangeEvent } from "react";
import { useBoundStore } from "@/zustand/useBoundStore";
import TextSummarizerTextareaFooter from "./TextSummarizerTextareaFooter";
import { useTextSummarizer } from "@/hooks/useTextSummarizer";
import ExampleTextButton from "../ExampleTextButton";
import Textarea from "../Textarea";
import TextareaWrapper from "../TextareaWrapper";
import isDesktopView from "@/utils/isDesktopView";
import React, { useEffect } from "react";
import { useRouter } from "next/router";

interface TextSummarizerTextareaProps {
  setTextToSummrize: (text: string) => void;
}
const EXAMPLE_TEXT =
  "Virtual reality (VR) is a computer-generated environment that simulates a physical presence in a three-dimensional space. By using VR headsets, users can interact with digital environments that feel like real life. VR is used in a variety of fields, such as gaming, education, and training simulations. Its potential applications are continuously expanding as technology advances.";

const TextSummarizerTextareaWrapper = (): JSX.Element => {
  const { handleSubmit, loading, onChange } = useTextSummarizer();
  const { value, setValue } = useBoundStore();
  const router = useRouter();
  const { data } = router.query;
  const setText = data ? data.toString() : "";

  useEffect(() => {
    setValue(setText);
  }, []);

  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newTextValue = e.target.value;
    onChange(e);

    setValue(newTextValue);
  };
  return (
    <TextareaWrapper>
      <form onSubmit={handleSubmit}>
        <Textarea
          onChange={handleTextareaChange}
          value={value}
          name="textarea"
          autofocus={isDesktopView()}
        />
        {value.length <= 0 && (
          <ExampleTextButton
            exampleText={EXAMPLE_TEXT}
            className="!text-purple-500"
          />
        )}
        <TextSummarizerTextareaFooter value={value} loading={loading} />
      </form>
    </TextareaWrapper>
  );
};

export default TextSummarizerTextareaWrapper;
