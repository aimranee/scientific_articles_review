import { PlagiarismProps } from "@/interfaces";
import { Badge, Progress, Space } from "antd";
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
      <h2 className="text-base lg:text-lg mb-15">Plagiarism Check Results</h2>
      {isLoading ? (
        <p>Waiting...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : result ? (
        <div>
          <div>
            <div
              style={{
                marginBottom: "20px",
                marginTop: "20px",
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
          </div>
          <div
            style={{
              height: "390px",
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
