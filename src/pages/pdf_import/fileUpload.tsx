import { FileUploadProps } from "@/interfaces";
import { ChangeEvent, useState } from "react";
import { PhotoIcon } from "@heroicons/react/24/outline";
import axios from "axios";
// import { parseString } from "xml2js";

// import fs from "fs";
// import path from "path";
import { type FC } from "react";

const FileUpload: FC<FileUploadProps> = ({ setFile, setRes }) => {
  const [uploading, setUploading] = useState(false);

  const uploadHandler = async (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("file-upload", selectedFile, selectedFile.name);

    try {
      const response = await axios.post(
        "http://localhost:8080/upload",
        formData
      );
      console.log("11111111111" + response.data);
      setRes(response.data);
    } catch (error) {
      console.error("Error uploading the file:", error);
    }
  };

  return (
    <div className="flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 mt-12">
      <div className="text-center">
        <PhotoIcon
          className="mx-auto h-12 w-12 text-gray-300"
          aria-hidden="true"
        />
        <div className="mt-4 flex text-sm leading-6 text-gray-600">
          <label
            htmlFor="file-upload"
            className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
          >
            <span>Upload a file</span>
            <input
              id="file-upload"
              name="file-upload"
              type="file"
              onChange={uploadHandler}
              className="sr-only"
            />
          </label>
          <p className="pl-1">or drag and drop</p>
          <br />
          {uploading ? "Uploading..." : "Upload"}
          <p></p>
          {/* <button disabled={uploading}> */}
          {/* </button> */}
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
