import React, { useEffect, useState } from "react";
import { Avatar, List } from "antd";
import { log } from "console";

interface DataType {
  matches: {
    highlight: string[];
    percent: number;
    url: string;
  }[];
}

const App: React.FC<DataType> = ({ matches }) => {
  console.log("test " + matches.map);
  return (
    <div
      id="scrollableDiv"
      style={{
        height: 400,
        overflow: "auto",
        padding: "0 16px",
        border: "1px solid rgba(140, 140, 140, 0.35)",
      }}
    >
      <List
        dataSource={matches}
        renderItem={(item) => (
          <List.Item key={item.percent}>
            <List.Item.Meta
              title={<a href="https://ant.design">{item.url}</a>}
              description={item.highlight}
            />
            <div>{item.highlight}</div>
            {/* <div>
        <span>
          {item.highlight.map((high: any, index: number) => (
            <span key={index}>
              {`${extractHighlightedTextByWords88(
                textareaContent,
                high,
                10 // You can adjust the number of context words as needed
              )}`}
            </span>
          ))}
        </span>
        <span>Percent: {item.percent}</span>
      </div> */}
          </List.Item>
        )}
      />
    </div>
  );
};
