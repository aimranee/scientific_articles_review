import PlagiarismCheckerInfo from "@/../public/PlagiarismCheckerInfo.json";
import PlagiarismCheckerTextareaWrapper from "@/components/PlagiarismChecker/PlagiarismCheckerTextareaWrapper";
import TextareaSection from "@/components/TextareaSection";
import Aside from "@/components/PlagiarismChecker/Aside";
import { Layout, Space } from "antd";

const { Header, Footer, Sider, Content } = Layout;
import { useState, useEffect } from "react";

import Navbar from "@/components/Navbar";
import { HeaderDescription, HeaderTitle } from "@/enums.d";
import { useCleaner } from "@/hooks/useCleaner";
import { type FC } from "react";
import axios from "axios";
const headerStyle: React.CSSProperties = {
  textAlign: "center",
};
const siderStyle: React.CSSProperties = {
  textAlign: "center",
};
const contentStyle: React.CSSProperties = {
  textAlign: "center",
};
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
        // console.log("response " + response.data.result);
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
    <div className="flex flex-wrap gap-y-5 lg:flex-nowrap bg-white-1 dark:bg-black text-white w-full h-screen md:pt-0">
      <div id="modal-root"></div>
      <div className="flex flex-col w-full">
        <Header style={headerStyle}>
          <Navbar />
        </Header>

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
