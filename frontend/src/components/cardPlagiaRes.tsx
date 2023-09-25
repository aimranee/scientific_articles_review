import React from "react";
import { Badge, Card } from "antd";
import { extractHighlightedTextByWordsTT } from "@/utils/highlithText";
import { Typography } from "antd";
const { Paragraph } = Typography;
interface MatchType {
  highlight: string[];
  percent: number;
  url: string;
}

interface DataType {
  matches: MatchType[];
  title: string;
  textareaContent: string;
  loading: boolean;
}
const cardTitleStyle = {
  // color: isDarkTheme ? "white" : "black", // Change the title color based on the theme
};
export const CardPlagia: React.FC<DataType> = ({
  matches,
  textareaContent,
  loading,
}) => (
  <Card title="Result of cheking" className={"dark:text-white"}>
    {matches.map((match, index) => (
      <Card
        style={{ marginTop: "20px", marginBottom: "20px" }}
        key={index}
        type="inner"
        title={match.url}
        extra={<a href={match.url}>More</a>}
      >
        <div>
          <Badge.Ribbon text={match.percent} color="red" />

          <ul>
            {match.highlight.map((highlight: any, highlightIndex: number) => (
              <span key={highlightIndex}>
                <Paragraph ellipsis={{ rows: 2, expandable: true }}>
                  {extractHighlightedTextByWordsTT(
                    textareaContent,
                    highlight,
                    10 // You can adjust the number of context words as needed
                  )}
                </Paragraph>
              </span>
            ))}
          </ul>
        </div>
      </Card>
    ))}
  </Card>
);
