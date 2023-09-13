import React, { Fragment, useEffect, useState } from "react";
import {
  InboxOutlined,
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Upload, Typography, Card, Skeleton } from "antd";
import axios from "axios";
import { type FC } from "react";
const { Title, Paragraph } = Typography;
import type { UploadFile, UploadProps } from "antd/es/upload/interface";
import Link from "next/link";

const FileUpload: FC = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const { Dragger } = Upload;
  const [loading, setLoading] = useState(false);
  const [res, setRes] = useState<any>(null);

  const body = res ? extractBody(res) : [];
  const front = res ? extractFront(res) : [];
  const mergedArray = [...front, ...body];

  useEffect(() => {
    // Check Local Storage for the "uploadResult" key
    const storedUploadResult = localStorage.getItem("uploadResult");
    if (storedUploadResult) {
      // If it exists, parse it from JSON and set it in the state
      setRes(JSON.parse(storedUploadResult));
    }
  }, []);

  const handleSettingClick = (current: any) => {
    // Handle the click for the Setting icon
    console.log("Setting icon clicked for:", current);
  };

  const handleEditClick = (current: any) => {
    // Handle the click for the Edit icon
    console.log("Edit icon clicked for:", current);
  };

  const handleEllipsisClick = (current: any) => {
    // Handle the click for the Ellipsis icon
    console.log("Ellipsis icon clicked for:", current);
  };

  function extractFront(obj: any) {
    const components: JSX.Element[] = [];

    function recurse(current: any, property: any) {
      // console.log("LOG1 => current : " + current + "  property : " + property);
      if (Array.isArray(current)) {
        for (let i = 0; i < current.length; i++) {
          recurse(current[i], property);
        }
      } else if (typeof current === "object") {
        for (const key in current) {
          if (key !== "$" && key !== "body" && key !== "back") {
            if (current.hasOwnProperty(key)) {
              if (property === "abstract") {
                const title = (
                  <Card
                    className=" bg-white dark:bg-gray-1 "
                    style={{ marginTop: 16 }}
                    loading={loading}
                  >
                    <Skeleton loading={loading} active>
                      <Typography.Title
                        className="dark:text-white "
                        editable
                        level={4}
                        style={{ margin: 0 }}
                      >
                        Abstract
                      </Typography.Title>
                    </Skeleton>
                  </Card>
                );
                components.push(title);
              }
              recurse(current[key], key);
            }
          }
        }
      } else {
        // console.log(
        //   "LOG1 => current : " + current + "  property : " + property
        // );
        if (property === "article-title") {
          const bigTitle = (
            <Title
              className=" text-text-gray dark:text-white"
              style={{ marginTop: 30 }}
              level={2}
            >
              <Skeleton loading={loading} active>
                "{current}"
              </Skeleton>
            </Title>
          );
          components.push(bigTitle);
        }

        if (property === "p") {
          const p = (
            <Card
              className=" bg-white dark:bg-gray-1 "
              style={{ marginTop: 16 }}
              actions={[
                <Link
                  href={{
                    pathname: "/grammar-checker",
                    query: {
                      data: current,
                    },
                  }}
                >
                  <SettingOutlined
                    key="setting"
                    onClick={() => handleSettingClick(current)}
                  />
                </Link>,
                <Link
                  href={{
                    pathname: "/vocabulary-checker",
                    query: {
                      data: current,
                    },
                  }}
                >
                  <EditOutlined
                    key="edit"
                    onClick={() => handleEditClick(current)}
                  />
                </Link>,
                <Link
                  href={{
                    pathname: "/plagiarism-checker",
                    query: {
                      data: current,
                    },
                  }}
                >
                  <EllipsisOutlined
                    key="ellipsis"
                    onClick={() => handleEllipsisClick(current)}
                  />
                </Link>,
              ]}
            >
              <Skeleton loading={loading} active>
                <Paragraph
                  className=" text-text-gray dark:text-white"
                  editable={{
                    autoSize: { maxRows: 5, minRows: 3 },
                  }}
                >
                  {current}
                </Paragraph>
              </Skeleton>
            </Card>
          );
          components.push(p);
        }
      }
    }

    recurse(obj, "");

    return components;
  }

  function extractBody(obj: any) {
    const components: JSX.Element[] = [];

    function recurse(current: any, property: any) {
      if (Array.isArray(current)) {
        // console.log(
        //   "LOG1 => current : " + current + "  property : " + property
        // );

        for (let i = 0; i < current.length; i++) {
          recurse(current[i], property);
        }
      } else if (typeof current === "object") {
        for (const key in current) {
          if (
            key !== "xref" &&
            key !== "$" &&
            key !== "front" &&
            key !== "back"
          ) {
            if (current.hasOwnProperty(key)) {
              recurse(current[key], key);
            }
          }
        }
      } else {
        if (property === "title") {
          if (current === "-") current = "Abstract";
          const title = (
            <Card
              className=" bg-white dark:bg-gray-1 "
              style={{ marginTop: 16 }}
              loading={loading}
            >
              <Typography.Title
                className=" text-text-gray dark:text-white"
                editable
                level={4}
                style={{ margin: 0 }}
              >
                {current}
              </Typography.Title>
            </Card>
          );
          components.push(title);
        }

        if (property === "_" || property === "p") {
          const p = (
            <Card
              className=" bg-white dark:bg-gray-1 "
              style={{ marginTop: 16 }}
              actions={[
                <Link
                  href={{
                    pathname: "/grammar-checker",
                    query: {
                      data: current,
                    },
                  }}
                >
                  <SettingOutlined
                    key="setting"
                    onClick={() => handleSettingClick(current)}
                  />
                </Link>,
                <Link
                  href={{
                    pathname: "/vocabulary-checker",
                    query: {
                      data: current,
                    },
                  }}
                >
                  <EditOutlined
                    key="edit"
                    onClick={() => handleEditClick(current)}
                  />
                </Link>,
                <Link
                  href={{
                    pathname: "/plagiarism-checker",
                    query: {
                      data: current,
                    },
                  }}
                >
                  <EllipsisOutlined
                    key="ellipsis"
                    onClick={() => handleEllipsisClick(current)}
                  />
                </Link>,
              ]}
            >
              <Skeleton loading={loading}>
                <Paragraph
                  className=" text-text-gray dark:text-white"
                  editable={{
                    autoSize: { maxRows: 5, minRows: 3 },
                  }}
                >
                  {current}
                </Paragraph>
              </Skeleton>
            </Card>
          );
          components.push(p);
        }
      }
    }

    recurse(obj, "");

    return components;
  }

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

      {res &&
        mergedArray.map((component, index) => (
          <Fragment key={index}>{component}</Fragment>
        ))}
      <>{loading ? <Skeleton style={{ marginTop: 30 }} active /> : <></>}</>
    </>
  );
};

export default FileUpload;

// const [componentData, setComponentData] = useState(
//   Array(mergedArray.length).fill("")
// );

// const handleComponentChange = (index: any, newValue: any) => {
//   const newData = [...componentData];
//   newData[index] = newValue;
//   setComponentData(newData);
// };
