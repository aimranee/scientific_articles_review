import React, { useState, useEffect } from "react";
import { type FC } from "react";
import GrammarCheckerInfo from "@/../public/GrammarCheckerInfo.json";
import TextareaSection from "@/components/TextareaSection";
import Navbar from "@/components/Navbar";
import { HeaderDescription, HeaderTitle } from "@/enums.d";
import { Typography } from "antd";
import { useRouter } from "next/router";
const { Paragraph } = Typography;

const PdfUpload: FC = () => {
  const [lengthLimitedStr, setLengthLimitedStr] = useState(
    "This is an editable text with limited length."
  );

  const router = useRouter();
  const { res } = router.query;

  // Parse the JSON string back to an object
  const parsedRes = JSON.parse((res as string) || "{}");

  useEffect(() => {
    console.log("test1 : " + parsedRes.article.front["article-meta"]);
  }, []);

  return (
    <>
      <div className="flex flex-wrap gap-y-5 lg:flex-nowrap bg-white-1 dark:bg-black text-white w-full h-screen md:pt-0">
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
              {parsedRes && (
                <Typography.Title editable level={1} style={{ margin: 0 }}>
                  <p>
                    {/* hhhhhhhhhhhhhhhhhh{parsedRes.article.front["journal-meta"]} */}
                  </p>
                  {
                    // parsedRes.article.front["journal-meta"][
                    //   "journal-title-group"
                    // ]["journal-title"]
                  }
                </Typography.Title>
              )}
              <Typography.Title editable level={2} style={{ margin: 0 }}>
                intro
              </Typography.Title>
              <Typography.Title editable level={3} style={{ margin: 0 }}>
                sous titre
              </Typography.Title>
              <Paragraph
                editable={{
                  onChange: setLengthLimitedStr,
                  maxLength: 50,
                  autoSize: { maxRows: 5, minRows: 3 },
                }}
              >
                {lengthLimitedStr}
              </Paragraph>
            </TextareaSection>
          </main>
        </div>
      </div>
    </>
  );
};

export default PdfUpload;
