import { useState, useEffect } from "react";
import axios from "axios";
interface AsideProps {
  textareaContent: string;
  result: any; // Update the type based on your API response structure
  isLoading: boolean;
  error: string | null;
}

const Aside: React.FC<AsideProps> = ({
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
          {" "}
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
                      {result.matches.map((match: any, index: number) => (
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
                      ))}
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <p>Enter text to check for plagiarism.</p>
      )}
    </aside>
  );
};

export default Aside;
