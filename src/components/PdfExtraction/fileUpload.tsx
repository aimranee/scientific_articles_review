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
const { Title, Paragraph, Text, Link } = Typography;

import type { UploadFile, UploadProps } from "antd/es/upload/interface";

const FileUpload: FC = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const { Dragger } = Upload;
  const [loading, setLoading] = useState(false);
  const [res, setRes] = useState<any>(null);

  const components = res ? extractKeysAndValues(res) : []; //          bzaaaaf dyal les functions heer Mimi's idea

  function extractKeysAndValues(obj: any) {
    const components: JSX.Element[] = [];

    function recurse(current: any, property: any) {
      // if (current === "front")
      //   if (current === "article-meta") {
      //     for (let i = 0; i < current.length; i++) {
      //       recurse(current[i], property + ".");
      //     }
      //   }
      if (Array.isArray(current)) {
        console.log(
          "LOG1 => current : " + current + "  property : " + property
        );

        for (let i = 0; i < current.length; i++) {
          recurse(current[i], property);
        }
      } else if (typeof current === "object") {
        for (const key in current) {
          if (key !== "xref" && key !== "journal-meta" && key !== "back") {
            if (current.hasOwnProperty(key)) {
              // if (key.includes("article-meta")) {
              //   console.log("hhhhhhhhhhhhhhhhhhhhhhhhh");

              //   for (let i = 0; i < current.length; i++) {
              //     recurse(current[key], property + "." + key);
              //   }
              // } else {
              recurse(current[key], key);
              // }
            }
          }
        }
      } else {
        if (property === "title") {
          if (current === "-") current = "Abstract";
          const title = (
            <Card style={{ marginTop: 16 }} loading={loading}>
              <Typography.Title editable level={4} style={{ margin: 0 }}>
                {current}
              </Typography.Title>
            </Card>
          );
          components.push(title);
        }
        if (property === "title-group.article-title") {
          const bigTitle = <Title level={2}>Guidelines and Resources</Title>;
          components.push(bigTitle);
        }
        if (property === "_" || property === "p") {
          const p = (
            <Card
              style={{ marginTop: 16 }}
              actions={[
                <SettingOutlined key="setting" />,
                <EditOutlined key="edit" />,
                <EllipsisOutlined key="ellipsis" />,
              ]}
            >
              <Skeleton loading={loading}>
                <Paragraph
                  editable={{
                    maxLength: 50,
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

      const formData = new FormData();

      formData.append("file-upload", file, file.name);
      setLoading(true);

      try {
        const response = await axios.post(
          "http://localhost:8080/upload",
          formData
        );
        setRes(response.data.result);
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
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibited from
          uploading company data or other banned files.
        </p>
      </Dragger>

      {res ? (
        components.map((component, index) => (
          <Fragment key={index}>{component}</Fragment>
        ))
      ) : (
        <>
          <Card style={{ marginTop: 16 }} loading={loading}>
            <Typography.Title editable level={4} style={{ margin: 0 }}>
              Title
            </Typography.Title>
          </Card>
          <Card
            style={{ marginTop: 16 }}
            actions={[
              <SettingOutlined key="setting" />,
              <EditOutlined key="edit" />,
              <EllipsisOutlined key="ellipsis" />,
            ]}
          >
            <Skeleton loading={loading}>
              <Paragraph
                editable={{
                  maxLength: 50,
                  autoSize: { maxRows: 5, minRows: 3 },
                }}
              >
                Paragraph
              </Paragraph>
            </Skeleton>
          </Card>
        </>
      )}
    </>
  );
};

export default FileUpload;
