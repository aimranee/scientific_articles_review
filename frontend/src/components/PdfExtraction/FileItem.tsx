import { FileItemProps } from "@/interfaces";
import { type FC } from "react";

const FileItem: FC<FileItemProps> = ({ file }) => {
  if (!file) {
    return null; // Return null if file is null
  }
  return (
    <div className="mb-5 mt-5 rounded-md bg-[#F5F7FB] py-4 px-8">
      <div className="flex items-center justify-between" key={file.name}>
        <span className="truncate pr-3 text-base font-medium text-[#07074D]">
          {file.name}
        </span>
      </div>
    </div>
  );
};

export default FileItem;
