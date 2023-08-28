import { useState, useEffect } from "react";
import axios from "axios";

const text_to_check: string =
  "hello my friend how are u whell i m gonna talk today about innation did you ever heard of this Le dragon est une créature légendaire représentée comme une sorte de gigantesque reptile, ailes déployées et pattes armées de griffes. the idea is we gonna try to make some diffrence in IT wold by adding tolls gonna help peple in the live for exmeple ....";

const Aside = (): JSX.Element => {
  const [result, setResult] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios
        .post(
          "http://localhost:8080/plagiarism-check",
          text_to_check,

          {
            headers: {
              "Content-Type": "text/plain", // Set the content type to plain text
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          console.log("data dial aimrane " + fetchData);
          const fetchedResult = response.data.result;

          setResult(fetchedResult);
          // Handle the response data as needed
        });
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <aside className="w-full lg:w-96 md:max-h-screen bg-white dark:bg-gray-1 text-gray-1 dark:text-white p-5 shadow-lg">
      <h2 className="text-base lg:text-lg mb-10">Plagiarism Check Results</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : result ? (
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
        <p>Error loading data.</p>
      )}
    </aside>
  );
};

export default Aside;
