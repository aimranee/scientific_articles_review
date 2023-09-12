import React from "react";
import { type FC, type ChangeEvent } from "react";
import PlagiarismCheckerTextareaFooter from "./PlagiarismCheckerTextareaFooter";
import PlagiarismCheckerTextarea from "./PlagiarismCheckerTextarea";
import {
  PlagiarismCheckerTextareaWrapperProps,
  TextCheckPropos,
} from "@/interfaces";

const PlagiarismCheckerTextareaWrapper: FC<
  PlagiarismCheckerTextareaWrapperProps
> = ({ textareaContent }) => {

  return (
    <div className="border dark:border-gray-2 bg-white dark:bg-gray-1 rounded-md shadow-lg">
      <PlagiarismCheckerTextarea
        setTextToCheck={textareaContent}
      />
      <PlagiarismCheckerTextareaFooter loading={true} />
    </div>
  );
};

export default PlagiarismCheckerTextareaWrapper;
