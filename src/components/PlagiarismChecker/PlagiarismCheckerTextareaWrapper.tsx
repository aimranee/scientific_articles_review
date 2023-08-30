import React, { useState } from "react";
import { usePlagiarismChecker } from "@/hooks/usePlagiarismChecker";

import PlagiarismCheckerTextareaFooter from "./PlagiarismCheckerTextareaFooter";
import PlagiarismCheckerTextarea from "./PlagiarismCheckerTextarea";
import { TextCheckPropos } from "@/interfaces";
interface PlagiarismCheckerTextareaWrapperProps {
  setTextareaContent: (content1: string) => void;
}
const PlagiarismCheckerTextareaWrapper: React.FC<
  PlagiarismCheckerTextareaWrapperProps
> = ({ setTextareaContent }) => {
  // const [exampleToCheck, setExampleToCheck] = useState(Exemple_to_check);
  const { onChange, loading, setTextToCheck } = usePlagiarismChecker(); // Assuming that usePlagiarismChecker returns these values
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const content = e.target.value;
    setTextareaContent(content); // Update the lifted state
    onChange(e);
    console.log("texterea   " + content);
  };
  return (
    <div className="border dark:border-gray-2 bg-white dark:bg-gray-1 rounded-md shadow-lg">
      <PlagiarismCheckerTextarea
        onChange={handleTextareaChange}
        setTextToCheck={setTextToCheck}
      />
      <PlagiarismCheckerTextareaFooter loading={loading} />
    </div>
  );
};

export default PlagiarismCheckerTextareaWrapper;
