import PlagiarismCheckerInfo from "@/../public/PlagiarismCheckerInfo.json";
import PlagiarismCheckerTextareaWrapper from "@/components/PlagiarismChecker/PlagiarismCheckerTextareaWrapper";
import TextareaSection from "@/components/TextareaSection";
import Aside from "@/components/PlagiarismChecker/Aside";
import { Layout } from "antd";

import { useState, useEffect } from "react";

import Navbar from "@/components/Navbar";
import { HeaderDescription, HeaderTitle } from "@/enums.d";
import { useCleaner } from "@/hooks/useCleaner";
import { type FC } from "react";
import axios from "axios";
import {
  NotificationFailure,
  NotificationWarning,
} from "@/utils/toastNotifications";

const PlagiarismChecker: FC = () => {
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
    setIsLoading(true);
    const timeout = setTimeout(() => {
      NotificationWarning(
        "Due to the high traffic, the response may take a few seconds"
      );
    }, 10000);

    try {
      const response = await axios.post(
        "https://precious-skirt-lion.cyclic.cloud/plagiarism-check",
        textareaContent,
        {
          headers: {
            "Content-Type": "text/plain",
          },
        }
      );

      if (response.data && response.data.result) {
        setResult(response.data.result);
      } else {
        setError("API response is missing expected data structure.");
      }
    } catch (error) {
      setError("Error fetching data");
      NotificationFailure(
        "Due to connectivity issuesSwitch to a stronger internet connection for stability."
      );
    } finally {
      setIsLoading(false);
      clearTimeout(timeout);
    }
  };

  return (
    <div className="flex flex-wrap gap-y-10 md:flex-nowrap bg-white-1 dark:bg-black text-white w-full h-max min-h-screen pb-5 md:pt-0">
      <div id="modal-root"></div>
      <div className="flex flex-col w-full">
        <Navbar />

        <Layout hasSider>
          <main className="w-full h-max md:h-full flex justify-center  dark:bg-black text-white  items-center px-5 relative">
            <TextareaSection>
              <TextareaSection.Header
                title={HeaderTitle.PLAGIARIM_CHECKER}
                description={HeaderDescription.PLAGIARIM_CHECKER}
                className="bg-blue-1"
                content={PlagiarismCheckerInfo}
              />
              <PlagiarismCheckerTextareaWrapper
                textareaContent={setTextareaContent}
                isLoading={isLoading}
              />
            </TextareaSection>
          </main>
          <Aside
            textareaContent={textareaContent}
            result={result}
            isLoading={isLoading}
            error={error}
          />
        </Layout>
      </div>
    </div>
  );
};

export default PlagiarismChecker;
