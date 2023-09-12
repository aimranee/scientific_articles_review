import { PlagiarismProps } from "@/interfaces";
import { Progress, Space } from "antd";
import { CardPlagia } from "../cardPlagiaRes";
const conicColors = {
  "0%": "#87d068",
  "50%": "#ffe58f",
  "100%": "#ffccc7",
};

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
            <div
              style={{
                marginBottom: "20px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Space wrap>
                <Progress
                  type="dashboard"
                  percent={100 - parseInt(result.percent)}
                  strokeColor={conicColors}
                />
              </Space>
            </div>

            {/* ;<p>Words Count: {result["words_count"]}</p> */}
          </div>

          <div
            style={{
              height: "400px",

              overflowY: "scroll",
            }}
          >
            <CardPlagia
              title="Card Title"
              matches={result.matches}
              textareaContent={textareaContent}
              loading={false}
            />
          </div>
        </div>
      ) : (
        <p>Enter text to check for plagiarism.</p>
      )}
    </aside>
  );
};

export default Aside;
