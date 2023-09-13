import GrammarCheckerInfo from "@/../public/GrammarCheckerInfo.json";
import GrammarCheckerTextareaWrapper from "@/components/GrammarChecker/GrammarCheckerTextareaWrapper";
import TextareaSection from "@/components/TextareaSection";
import Aside from "@/components/GrammarChecker/Aside";
import Navbar from "@/components/Navbar";
import { HeaderDescription, HeaderTitle } from "@/enums.d";
import { useCleaner } from "@/hooks/useCleaner";
import { type FC } from "react";
import { Layout, Space } from "antd";
const { Header, Footer, Sider, Content } = Layout;

const GrammarChecker: FC = () => {
  useCleaner();
  const headerStyle: React.CSSProperties = {
    textAlign: "center",
  };
  return (
    <div className="flex flex-wrap gap-y-10 md:flex-nowrap bg-white-1 dark:bg-black text-white w-full h-max min-h-screen pb-5 md:pt-0">
      <div id="modal-root"></div>
      <div className="flex flex-col w-full">
        <Navbar />

        <Layout hasSider>
          <main className="w-full h-max md:h-full flex justify-center   dark:bg-black items-center px-5 relative">
            <TextareaSection>
              <TextareaSection.Header
                title={HeaderTitle.GRAMMAR_CHECKER}
                description={HeaderDescription.GRAMMAR_CHECKER}
                className="bg-orange-1"
                content={GrammarCheckerInfo}
              />
              <GrammarCheckerTextareaWrapper />
            </TextareaSection>
          </main>{" "}
          <Aside />
        </Layout>
      </div>
    </div>
  );
};

export default GrammarChecker;
