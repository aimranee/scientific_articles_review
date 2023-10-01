import React, { useState, useEffect } from "react";
import { type FC } from "react";
import UploadFileInfo from "@/../public/UploadFileInfo.json";
import TextareaSection from "@/components/TextareaSection";
import Navbar from "@/components/Navbar";
import { HeaderDescription, HeaderTitle } from "@/enums.d";
import FileUpload from "@/components/PdfExtraction/fileUpload";
import { Layout } from "antd";

const PdfUpload: FC = () => {
  return (
    <>
      <div className="flex gap-y-10 md:flex-nowrap bg-white-1 dark:bg-black text-white w-full h-max min-h-screen pb-5 md:pt-0">
        <div id="modal-root"></div>
        <div className="flex flex-col w-full">
          <Navbar />
          <Layout hasSider>
            <main className="w-full h-max md:h-full flex justify-center dark:bg-black text-white  items-center px-5 relative">
              <TextareaSection>
                <TextareaSection.Header
                  title={HeaderTitle.FILE_UPLOAD}
                  description={HeaderDescription.FILE_UPLOAD}
                  className="bg-yellow-500"
                  content={UploadFileInfo}
                />

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
