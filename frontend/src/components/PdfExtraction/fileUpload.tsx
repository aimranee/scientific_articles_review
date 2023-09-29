import React, { Fragment, useEffect, useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { Upload, Skeleton, FloatButton, Layout } from "antd";
import axios from "axios";
import { type FC } from "react";
import type { UploadFile, UploadProps } from "antd/es/upload/interface";
import { extractFront } from "./extractFront";
import { extractBody } from "./extractBody";
import { extractBack } from "./extractBack";
import Aside from "./Aside";
const { Content } = Layout;

const FileUpload: FC = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const { Dragger } = Upload;
  const [loading, setLoading] = useState(false);
  const [res, setRes] = useState<any>(null);
  let n = 0;
  const body = res ? extractBody(res, loading) : [];
  const front = res ? extractFront(res, loading) : [];
  const back = res ? extractBack(res, loading) : [];
  const mergedArray = [...front, ...body];
  // const { setValue } = useBoundStore();

  useEffect(() => {
    const storedUploadResult = localStorage.getItem("uploadResult");
    if (storedUploadResult) {
      setRes(JSON.parse(storedUploadResult));
    }
  }, []);

  const props: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: async (file) => {
      setFileList([file]);
      setLoading(true);

      const formData = new FormData();
      formData.append("file-upload", file, file.name);

      try {
        const response = await axios.post(
          "http://localhost:8080/upload",
          formData
        );
        setRes(response.data.result);
        localStorage.setItem(
          "uploadResult",
          JSON.stringify(response.data.result)
        );
        // const formattedReferences = extractReferences(jsonData);

        // Use the formatted references
        // console.log(formattedReferences);
      } catch (error) {
        console.error("Error uploading the file:", error);
      }
      setLoading(false);

      return false;
    },
    fileList,
  };

  return (
    <>
      <Dragger {...props}>
        <p className="text-xl lg:text-3xl text-orange-500 dark:text-yellow-500 font-bold text-center">
          <InboxOutlined />
        </p>

        <p className="text-xl lg:text-3xl text-gray-500 dark:text-white-1 font-bold text-center">
          Click or drag file to this area to upload
        </p>
        <p className=" !text-lg  dark:text-white-1">
          Support for a single or bulk upload. Strictly prohibited from
          uploading company data or other banned files.
        </p>
      </Dragger>
      <Layout hasSider>
        <Content style={{ margin: "24px 5px 0", overflow: "initial" }}>
          <div
            style={{
              padding: 24,
              background: "white",
            }}
          >
            {res &&
              mergedArray.map((component, index) => (
                <Fragment key={index}>{component}</Fragment>
              ))}
            <>
              {loading ? <Skeleton style={{ marginTop: 30 }} active /> : <></>}
            </>
          </div>
        </Content>
        {back && (
          <div
            style={{
              margin: "24px 5px 0",
              overflow: "initial",
              position: "sticky",
              display: "flex",
              zIndex: 1,
            }}
          >
            <Aside res={back} />
          </div>
        )}
        <FloatButton.BackTop />
      </Layout>
    </>
  );
};

export default FileUpload;
