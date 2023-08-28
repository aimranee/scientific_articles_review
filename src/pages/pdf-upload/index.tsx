// // import { useState, useEffect, ChangeEvent } from "react";
// // import { type FC } from "react";

// // import { FileUploadProps, Section, UploadedFile } from "@/interfaces";
// // import FileItem from "../../components/PdfExtraction/FileItem";
// // import FileUpload from "../../components/PdfExtraction/fileUpload";

// // const Pdf_Upload: FC<FileUploadProps> = () => {
// //   const [file, setFile] = useState<File | null>(null);
// //   const [res, setRes] = useState<any>(null);

// //   return (
// //     <div className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
// //       <div className="absolute inset-0 -z-10 overflow-hidden">
// //         <svg
// //           className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
// //           aria-hidden="true"
// //         >
// //           <defs>
// //             <pattern
// //               id="e813992c-7d03-4cc4-a2bd-151760b470a0"
// //               width={200}
// //               height={200}
// //               x="50%"
// //               y={-1}
// //               patternUnits="userSpaceOnUse"
// //             >
// //               <path d="M100 200V.5M.5 .5H200" fill="none" />
// //             </pattern>
// //           </defs>
// //           <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
// //             <path
// //               d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
// //               strokeWidth={0}
// //             />
// //           </svg>
// //           <rect
// //             width="100%"
// //             height="100%"
// //             strokeWidth={0}
// //             fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)"
// //           />
// //         </svg>
// //       </div>
// //       <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
// //         <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
// //           <div className="lg:pr-4">
// //             {res && (
// //               <div className="lg:max-w-lg">
// //                 <p className="text-base font-semibold leading-7 text-indigo-600">
// //                   {
// //                     res?.article?.front[0]["article-meta"][0]["title-group"][0][
// //                       "article-title"
// //                     ][0]
// //                   }
// //                 </p>
// //                 {res?.article?.body[0]?.sec.map((e: any, index: any) => (
// //                   <div key={index}>
// //                     <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-2xl">
// //                       {e?.title[0]}
// //                     </h2>
// //                     <div>
// //                       {e?.p?.map((elm: any, i: any) => (
// //                         <figure
// //                           key={i}
// //                           className="md:flex bg-slate-100 rounded-xl p-8 md:p-0 dark:bg-slate-800"
// //                         >
// //                           <div className="pt-6 md:p-8 text-center md:text-left space-y-4">
// //                             <p className="mt-6 text-gray-700 max-w-xl text-base leading-7 lg:max-w-lg">
// //                               {elm["_"]}
// //                             </p>
// //                           </div>
// //                         </figure>
// //                       ))}
// //                     </div>
// //                   </div>
// //                 ))}
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //         <div className="-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
// //           <FileUpload setFile={setFile} setRes={setRes} />
// //           <FileItem file={file} />
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

import { CaretRightOutlined } from "@ant-design/icons";
import type { CSSProperties } from "react";
import React from "react";
import type { CollapseProps } from "antd";
import { Collapse, theme } from "antd";
import FileUpload from "@/components/PdfExtraction/fileUpload";

// const text = `
//   A dog is a type of domesticated animal.
//   Known for its loyalty and faithfulness,
//   it can be found as a welcome guest in many households across the world.
// `;

// const getItems: (panelStyle: CSSProperties) => CollapseProps["items"] = (
//   panelStyle
// ) => [
//   {
//     key: "1",
//     label: "This is panel header 1",
//     children: <p>{text}</p>,
//     style: panelStyle,
//   },
//   {
//     key: "2",
//     label: "This is panel header 2",
//     children: <p>{text}</p>,
//     style: panelStyle,
//   },
//   {
//     key: "3",
//     label: "This is panel header 3",
//     children: <p>{text}</p>,
//     style: panelStyle,
//   },
// ];

// const Pdf_Upload: FC = (res: any) => {
//   const { token } = theme.useToken();

//   const panelStyle: CSSProperties = {
//     marginBottom: 24,
//     background: token.colorFillAlter,
//     border: "none",
//   };

//   return (
//     <>
//       <Collapse
//         bordered={false}
//         defaultActiveKey={["1"]}
//         expandIcon={({ isActive }) => (
//           <CaretRightOutlined rotate={isActive ? 90 : 0} />
//         )}
//         style={{ background: token.colorBgContainer, marginTop: 16 }}
//         items={getItems(panelStyle)}
//       />

//       <p>test{res}</p>
//     </>
//   );
// };

// export default Pdf_Upload;

import TextSummarizerInfo from "@/../public/TextSummarizerInfo.json";
import TextSummarizerTextareaWrapper from "@/components/TextSummarizer/TextSummarizerTextareaWrapper";
import { SummarizedText } from "@/components/TextSummarizer/SummarizedText";
import TextareaSection from "@/components/TextareaSection";
import Navbar from "@/components/Navbar";
import { HeaderDescription, HeaderTitle } from "@/enums.d";
import { useCleaner } from "@/hooks/useCleaner";
import { FC } from "react";

const text = `
    A dog is a type of domesticated animal.
    Known for its loyalty and faithfulness,
    it can be found as a welcome guest in many households across the world.
  `;
const getItems: (panelStyle: CSSProperties) => CollapseProps["items"] = (
  panelStyle
) => [
  {
    key: "1",
    label: "This is panel header 1",
    children: <p>{text}</p>,
    style: panelStyle,
  },
  {
    key: "2",
    label: "This is panel header 2",
    children: <p>{text}</p>,
    style: panelStyle,
  },
  {
    key: "3",
    label: "This is panel header 3",
    children: <p>{text}</p>,
    style: panelStyle,
  },
];

const PdfUpload: FC = () => {
  useCleaner();

  const { token } = theme.useToken();
  const panelStyle: CSSProperties = {
    marginBottom: 24,
    background: token.colorFillAlter,
    border: "none",
  };
  return (
    <>
      <div className="flex flex-wrap gap-y-10 md:flex-nowrap bg-white-1 dark:bg-black text-white w-full h-max min-h-screen pb-5 md:pt-0">
        <div id="modal-root"></div>
        <div className="flex flex-col w-full">
          <Navbar />
          <Collapse
            bordered={false}
            defaultActiveKey={["1"]}
            expandIcon={({ isActive }) => (
              <CaretRightOutlined rotate={isActive ? 90 : 0} />
            )}
            style={{ background: token.colorBgContainer, marginTop: 16 }}
            items={getItems(panelStyle)}
          />
          {/* <main className="w-full h-max md:h-full flex justify-center items-center px-5 relative">
            <TextareaSection>
              <TextareaSection.Header
                title={HeaderTitle.TEXT_SUMMARIZER}
                description={HeaderDescription.TEXT_SUMMARIZER}
                className="!bg-green-1"
                content={TextSummarizerInfo}
              />
              <div className="w-full flex flex-col lg:flex-row justify-center gap-5">
                <TextSummarizerTextareaWrapper />
                <SummarizedText>
                  <SummarizedText.SummarizedTextContent />
                  <SummarizedText.SummarizedTextFooter />
                </SummarizedText>
              </div>
            </TextareaSection>
          </main> */}
        </div>
      </div>
    </>
  );
};

export default PdfUpload;
