import React from "react";
import { Card, Spin } from "antd";
import { extractHighlightedTextByWordsTT } from "@/utils/highlithText";
import Paragraph from "antd/es/typography/Paragraph";

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

export const CardPlagia: React.FC<DataType> = ({
  matches,
  textareaContent,
  loading,
}) => (
  <Card title="checkeing">
    {matches.map((match, index) => (
      <Card
        key={index}
        type="inner"
        title={match.url}
        extra={<a href={match.url}>More</a>}
      >
        {/* Render the content for each match here */}
        <div>
          <p>Percent: {match.percent}</p>

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
