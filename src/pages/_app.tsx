import React, { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState("");

  const handleFileChange = (event: any) => {
    setFile(event.target.files[0]);
    console.log(file)
  };

 const handleSummarize = async () => {
  if (file) {
    const formData = new FormData();
    formData.append("file-upload", file);

    try {
      const response = await axios.post(
        "http://localhost:8080/summarize-pdf",
        formData,
         
      );

      if (response.data.success) {
        setSummary(`Summary saved at: ${response.data.summaryFilePath}`);
      } else {
        setSummary("Error summarizing PDF.");
      }
    } catch (error) {
      console.error(error);
      setSummary("Error summarizing PDF.");
    }
  }
};


  return (
    <div>
      <h1>PDF Summary App</h1>
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      <button onClick={handleSummarize}>Summarize</button>
      {summary && <p>{summary}</p>}
    </div>
  );
}

export default App;
