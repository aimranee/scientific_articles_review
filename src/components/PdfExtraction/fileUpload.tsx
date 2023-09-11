import React, { useContext, useState } from "react";
import { InboxOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload } from "antd";
import axios from "axios";
import { type FC } from "react";
import Link from "next/link";
import { parseString } from "xml2js";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import { useRouter } from "next/router";
import { ResProps } from "@/interfaces";

const FileUpload: FC = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const { Dragger } = Upload;
  const [res, setRes] = useState<any>(null);
  const router = useRouter();
  const handleUpload = () => {};

  const props: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: async (file) => {
      setFileList([file]);
      console.log("first1");

      const formData = new FormData();

      formData.append("file-upload", file, file.name);
      setUploading(true);
      console.log("first");

      try {
        const response = await axios.post(
          "http://localhost:8080/upload",
          formData
        );
        // console.log("11111111111" + response.data.result);
        parseString(response.data.result, (err, parsedResult) => {
          if (!err) {
            message.success("upload successfully.");
            setRes(parsedResult);
            console.log(
              "ttttt : " +
                res.article.front["article-meta"]["title-group"][
                  "article-title"
                ]
            );
          } else {
            console.error("Error parsing XML:", err);
          }
        });
      } catch (error) {
        console.error("Error uploading the file:", error);
      }
      setUploading(false);

      return false;
    },
    fileList,
  };

  return (
    <>
      <Dragger {...props}>
        <p className="text-xl lg:text-3xl text-orange-500 dark:text-yellow-1 font-bold text-center">
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
      <Button
        className=" !text-lg  dark:text-white-1"
        type="primary"
        onClick={handleUpload}
        disabled={fileList.length === 0}
        loading={uploading}
        style={{ marginTop: 16 }}
      >
        {uploading ? (
          "Uploading"
        ) : (
          <Link
            href={{
              pathname: "/pdf-upload",
              // query: { res: JSON.stringify(res) },
            }}
          >
            Start Upload
          </Link>
        )}
      </Button>
    </>
  );
};

export default FileUpload;
