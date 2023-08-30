import React, { useEffect, useState } from "react";
import axios from "axios";
const [result, setResult] = useState<any>([]);
const [isLoading, setIsLoading] = useState<boolean>(true);

useEffect(() => {
  fetchData();
}, []);
const fetchData = async () => {
  try {
    const response = await axios
      .post("http://localhost:8080/plagiarism-check", {
        headers: {
          "Content-Type": "text/plain", // Set the content type to plain text
        },
      })
      .then((response) => {
        console.log(response.data);

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
