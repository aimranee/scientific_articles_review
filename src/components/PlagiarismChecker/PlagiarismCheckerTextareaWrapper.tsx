import React, { useState } from "react";
import { usePlagiarismChecker } from "@/hooks/usePlagiarismChecker";
import { useBoundStore } from "@/zustand/useBoundStore";
import axios from "axios";

import PlagiarismCheckerTextareaFooter from "./PlagiarismCheckerTextareaFooter";
import PlagiarismCheckerTextarea from "./PlagiarismCheckerTextarea";
import text_to_check from "@/services/askToTurnitin";

const PlagiarismCheckerTextareaWrapper = (): JSX.Element => {
  const { onChange, loading, setTextToCheck } = usePlagiarismChecker();
  const [result, setResult] = useState<any>(null); // Initialize result as null

  const handleSubmit = async () => {
    try {
      // Send the text to the server for plagiarism check
      const response = await axios.post("/plagiarism-check", {
        text: text_to_check,
      });
      setResult(response.data.result);
    } catch (error) {
      console.error("Error while checking plagiarism:", error);
    }
  };

  return (
    <div className="border dark:border-gray-2 bg-white dark:bg-gray-1 rounded-md shadow-lg">
      <PlagiarismCheckerTextarea
        onChange={onChange}
        setTextToCheck={setTextToCheck}
      />
      <PlagiarismCheckerTextareaFooter loading={loading} />
      <button onClick={handleSubmit}>Check Plagiarism</button>
      {result && (
        <div>
          <table className="border-collapse border border-gray-500 w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-500 px-4 py-2">
                  Result Percent
                </th>
                <th className="border border-gray-500 px-4 py-2">
                  Words Count
                </th>
                <th className="border border-gray-500 px-4 py-2">Matches</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-500 px-4 py-2">
                  {100 - parseFloat(result.percent)}
                </td>
                <td className="border border-gray-500 px-4 py-2">
                  {result["words_count"]}
                </td>
                <td className="border border-gray-500 px-4 py-2">
                  <table>
                    <thead>
                      <tr className="bg-gray-200">
                        <th className="border border-gray-500 px-4 py-2">
                          Highlight
                        </th>
                        <th className="border border-gray-500 px-4 py-2">
                          Percent
                        </th>
                        <th className="border border-gray-500 px-4 py-2">
                          URL
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* {result.matches.map((match: any, index: number) => (
                        <tr key={index}>
                          <td className="border border-gray-500 px-4 py-2">
                            {match.highlight}
                          </td>
                          <td className="border border-gray-500 px-4 py-2">
                            {match.percent}
                          </td>
                          <td className="border border-gray-500 px-4 py-2">
                            {match.url}
                          </td>
                        </tr>
                      ))} */}
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PlagiarismCheckerTextareaWrapper;
