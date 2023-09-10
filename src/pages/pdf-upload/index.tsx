import React, { useState, useEffect } from "react";
import { type FC } from "react";
import GrammarCheckerInfo from "@/../public/GrammarCheckerInfo.json";
import TextareaSection from "@/components/TextareaSection";
import Navbar from "@/components/Navbar";
import { HeaderDescription, HeaderTitle } from "@/enums.d";
import FileUpload from "@/components/PdfExtraction/fileUpload";

const PdfUpload: FC = () => {
  return (
    <>
      <div className="flex-wrap gap-y-5 lg:flex-nowrap bg-white-1 dark:bg-black text-white w-full h-screen md:pt-0">
        <div id="modal-root"></div>
        <div className="flex flex-col w-full">
          <Navbar />
          <main className="w-full h-max md:h-full flex justify-center items-center px-5 relative">
            <TextareaSection>
              <TextareaSection.Header
                title={HeaderTitle.GRAMMAR_CHECKER}
                description={HeaderDescription.GRAMMAR_CHECKER}
                className="bg-yellow-1"
                content={GrammarCheckerInfo}
              />
              <FileUpload />
            </TextareaSection>
          </main>
        </div>
      </div>
    </>
  );
};

export default PdfUpload;
