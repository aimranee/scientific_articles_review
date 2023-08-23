import { useState, useEffect } from "react";
import axios from "axios";

const text_to_check =
  "Le dragon est une créature légendaire représentée comme une sorte de gigantesque reptile, ailes déployées et pattes armées de griffes.";

const Aside = (): JSX.Element => {
  const [result, setResult] = useState<any>([])
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      console.log("111")
      const response = await axios.post("http://localhost:8080/plagiarism-check", {
        text: text_to_check 
      });
      console.log("2222 respon"+ response.data.result["result_percent"])
      const fetchedResult = response.data.result;
      setResult(fetchedResult);
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
                <th className="border border-gray-500 px-4 py-2">Result Percent</th>
                <th className="border border-gray-500 px-4 py-2">Words Count</th>
                <th className="border border-gray-500 px-4 py-2">Matches</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-500 px-4 py-2">{(100 - parseFloat(result.percent))}</td>
                <td className="border border-gray-500 px-4 py-2">{result["words_count"]}</td>
                <td className="border border-gray-500 px-4 py-2">
                <tr className="bg-gray-200">
                       <th className="border border-gray-500 px-4 py-2">highlight</th>
                        <th className="border border-gray-500 px-4 py-2">percent</th>
                        <th className="border border-gray-500 px-4 py-2">url</th>
                      </tr>
                
                  {result.matches.map((match:any, index:any) => (
                    
                    <p key={index}>
                     <tr>
                      <td className="border border-gray-500 px-4 py-2">{match.highlight}</td>
                        <td className="border border-gray-500 px-4 py-2">{match.percent}</td>
                        <td className="border border-gray-500 px-4 py-2">{match.url}</td>
                     </tr>
                      
                 
                   
                    
                    </p>
                  ))}
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
