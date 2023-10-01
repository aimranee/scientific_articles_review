import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faListCheck,
  faSpellCheck,
  faBook,
  faLanguage
} from "@fortawesome/free-solid-svg-icons";
import { Typography, Card, Skeleton, Tooltip, Button } from "antd";
const { Paragraph } = Typography;
import Link from "next/link";

export function extractBody(obj: any, loading: boolean) {
  const components: JSX.Element[] = [];
  let n = 0;

  function recurse(current: any, property: any) {
    if (Array.isArray(current)) {

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
        n++;
        const p = (
          <Card
            className=" bg-white dark:bg-gray-1 "
            style={{ marginTop: 16 }}
            actions={[
              <Link
                key={n}
                href={{
                  pathname: "/text-summarizer",
                  query: {
                    data: current,
                  },
                }}
              >
                <Tooltip title="summarize">
                  <Button>
                    <FontAwesomeIcon icon={faBook} />
                  </Button>
                </Tooltip>
              </Link>,
              <Link
                key={n}
                href={{
                  pathname: "/grammar-checker",
                  query: {
                    data: current,
                  },
                }}
              >
                <Tooltip title="check grammar">
                  <Button>
                    <FontAwesomeIcon icon={faSpellCheck} />
                  </Button>
                </Tooltip>
              </Link>,
              <Link
                key={n}
                href={{
                  pathname: "/vocabulary-checker",
                  query: {
                    data: current,
                  },
                }}
              >
                <Tooltip title="check vocabulary ">
                  <Button>
                    <FontAwesomeIcon icon={faBook} />
                  </Button>
                </Tooltip>
              </Link>,
              <Link
                key={n}
                href={{
                  pathname: "/plagiarism-checker",
                  query: {
                    data: current,
                  },
                }}
              >
                <Tooltip title="check plagiarism">
                  <Button>
                    <FontAwesomeIcon icon={faListCheck} />
                  </Button>
                </Tooltip>
              </Link>,
              <Link
                key={n}
                href={{
                  pathname: "/translator",
                  query: {
                    data: current,
                  },
                }}
              >
                <Tooltip title="Translation">
                  <Button>
                    <FontAwesomeIcon icon={faLanguage} />
                  </Button>
                </Tooltip>
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
