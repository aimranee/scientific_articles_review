import React, { useState, useEffect } from "react";
import { type FC } from "react";
import GrammarCheckerInfo from "@/../public/GrammarCheckerInfo.json";
import TextareaSection from "@/components/TextareaSection";
import Navbar from "@/components/Navbar";
import { HeaderDescription, HeaderTitle } from "@/enums.d";
import FileUpload from "@/components/PdfExtraction/fileUpload";
import { Layout, Space } from "antd";

const { Header, Footer, Sider, Content } = Layout;
const PdfUpload: FC = () => {
  return (
    <>
      <div className="flex flex-wrap gap-y-10 md:flex-nowrap bg-white-1 dark:bg-black text-white w-full h-max min-h-screen pb-5 md:pt-0">
        <div id="modal-root"></div>
        <div className="flex flex-col w-full">
          <Navbar />
          <Layout>
            <main className="w-full h-max md:h-full flex justify-center  dark:bg-black text-white  items-center px-5 relative">
              <TextareaSection>
                <TextareaSection.Header
                  title={HeaderTitle.GRAMMAR_CHECKER}
                  description={HeaderDescription.GRAMMAR_CHECKER}
                  className="bg-yellow-500"
                  content={GrammarCheckerInfo}
                />
                <br />
                <br />
                <FileUpload />
              </TextareaSection>
            </main>
          </Layout>
        </div>
      </div>
    </>
  );
};

export default PdfUpload;
