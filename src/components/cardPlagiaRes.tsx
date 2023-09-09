import React from "react";
import { Card, Spin } from "antd";
import { extractHighlightedTextByWords88 } from "@/utils/highlithText";

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
  <Card title="Checking">
    {matches.map((match, index) => (
      <Spin spinning={loading} key={index}>
        <Card
          type="inner"
          title={match.url}
          extra={<a href={match.url}>More</a>}
        >
          {/* Render the content for each match here */}
          <div>
            <p>Percent: {match.percent}</p>

            <ul>
              {match.highlight.map((highlight: any, highlightIndex: number) => (
                <li key={highlightIndex}>
                  {`${extractHighlightedTextByWords88(
                    textareaContent,
                    highlight,
                    10 // You can adjust the number of context words as needed
                  )}`}
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </Spin>
    ))}
  </Card>
);
