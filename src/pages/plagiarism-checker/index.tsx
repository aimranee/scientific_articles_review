import PlagiarismCheckerInfo from "@/../public/PlagiarismCheckerInfo.json";
import PlagiarismCheckerTextareaWrapper from "@/components/PlagiarismChecker/PlagiarismCheckerTextareaWrapper";
import TextareaSection from "@/components/TextareaSection";
import Aside from "@/components/PlagiarismChecker/Aside";
import { useBoundStore } from "@/zustand/useBoundStore";

import { useState, useEffect } from "react";

import Navbar from "@/components/Navbar";
import { HeaderDescription, HeaderTitle } from "@/enums.d";
import { useCleaner } from "@/hooks/useCleaner";
import { type FC } from "react";
import axios from "axios";
import SkeletonText from "@/components/SkeletonText";

const PlagiarismChecker: FC = () => {
  const { checks } = useBoundStore();
  useCleaner();
  const [textareaContent, setTextareaContent] = useState(""); // Lifted state
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (textareaContent) {
      fetchData();
    }
  }, [textareaContent]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError("");

      const response = await axios.post(
        "http://localhost:8080/plagiarism-check",
        textareaContent,
        {
          headers: {
            "Content-Type": "text/plain",
          },
        }
      );

      if (response.data && response.data.result) {
        setResult(response.data.result);
        console.log("response " + response);
      } else {
        setError("API response is missing expected data structure.");
      }
    } catch (error) {
      setError("Error fetching data");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-wrap gap-y-10 md:flex-nowrap bg-white-1 dark:bg-black text-white w-full h-max min-h-screen pb-5 md:pt-0">
      <div id="modal-root"></div>
      <div className="flex flex-col w-full">
        <Navbar />
        <main className="w-full h-max md:h-full flex justify-center items-center px-5 relative">
          <TextareaSection>
            <TextareaSection.Header
              title={HeaderTitle.PLAGIARIM_CHECKER}
              description={HeaderDescription.PLAGIARIM_CHECKER}
              className="bg-pink-1"
              content={PlagiarismCheckerInfo}
            />
            <div className="w-full flex flex-col lg:flex-row justify-center gap-5">
              <PlagiarismCheckerTextareaWrapper
                setTextareaContent={setTextareaContent}
              />
            </div>
          </TextareaSection>
        </main>
        <Aside
          textareaContent={textareaContent}
          result={result}
          isLoading={isLoading}
          error={error}
        />
      </div>
    </div>
  );
};

export default PlagiarismChecker;
