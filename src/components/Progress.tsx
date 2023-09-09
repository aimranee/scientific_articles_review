import React from "react";
import { Space, Progress } from "antd"; // Assuming you're using Ant Design

interface MyProgressProps {
  percent: number;
}
const MyProgress: React.FC<MyProgressProps> = ({ percent }) => {
  const getStatus = (percent: number): "exception" | "normal" | "success" => {
    if (percent > 60) {
      return "exception";
    } else if (percent >= 30) {
      return "normal";
    } else {
      return "success";
    }
  };

  return (
    <Space wrap>
      <Progress
        type="circle"
        percent={100 - parseInt(String(percent))}
        status={getStatus(100 - parseInt(String(percent)))}
      />
    </Space>
  );
};

export default MyProgress;
