import { extractHighlightedTextByWords88 } from "@/utils/highlithText";
import { PlagiarismProps } from "@/interfaces";
import DonutChart from "@/components/donut-chart";
import { Progress, Space } from "antd";
import { List, Spin } from "antd";
import { CardPlagia } from "../cardPlagiaRes";

const Aside: React.FC<PlagiarismProps> = ({
  textareaContent,
  result,
  isLoading,
  error,
}) => {
  return (
    <aside className="w-full lg:w-96 md:max-h-screen bg-white dark:bg-gray-1 text-gray-1 dark:text-white p-5 shadow-lg">
      <h2 className="text-base lg:text-lg mb-10">Plagiarism Check Results</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : result ? (
        <div>
          <div>
            <p>Result Percent: {100 - parseInt(result.percent)}</p>

            <br />
            <Space wrap>
              <Progress
                type="circle"
                percent={100 - parseInt(result.percent)}
                status={
                  100 - parseInt(result.percent) > 60
                    ? "exception"
                    : 100 - parseInt(result.percent) >= 30
                    ? "normal"
                    : "success"
                }
              />
            </Space>

            {/* ;<p>Words Count: {result["words_count"]}</p> */}
          </div>

          <CardPlagia
            title="Card Title"
            matches={result.matches}
            textareaContent={textareaContent}
            loading={false}
          />
        </div>
      ) : (
        <p>Enter text to check for plagiarism.</p>
      )}
    </aside>
  );
};

export default Aside;
