import { type FC, type ChangeEvent } from "react";
import Textarea from "../Textarea";
import isDesktopView from "@/utils/isDesktopView";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { NotificationWarning } from "@/utils/toastNotifications";

interface PlagiarismCheckerTextareaProps {
  setTextToCheck: (text: string) => void;
}

const PlagiarismCheckerTextarea: FC<PlagiarismCheckerTextareaProps> = ({
  setTextToCheck,
}) => {
  const router = useRouter();
  const { data } = router.query;
  const setText = data ? data.toString() : "";
  const [textValue, setTextValue] = useState("");
  
  useEffect(() => {
    setTextValue(setText);
    setTextToCheck(setText);
  }, []);

  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newTextValue = e.target.value;
    setTextValue(newTextValue);
    const wordsCount = newTextValue.split(/\s+/);
    if (wordsCount.length >= 20) {
      setTextToCheck(newTextValue); // Set the text in setTextToCorrect
    } else {
      NotificationWarning("Should have more than 20 words.");
    }
  };

  return (
    <div className="relative w-full px-5">
      <Textarea
        onChange={handleTextareaChange}
        value={textValue}
        name="text"
        className="relative md:!max-h-[500px] !bg-transparent !p-0 !pt-5 !pl-0"
        autofocus={isDesktopView()}
      />
    </div>
  );
};

export default PlagiarismCheckerTextarea;
