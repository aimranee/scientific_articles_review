import { type FC } from "react";
import RepositoryButton from "./RepositoryButton";
import { ModalContentProps } from "@/interfaces";
import { useRouter } from "next/router";

const ModalContent: FC<ModalContentProps> = ({ content }) => {
  const sections = Object.entries(content);
  const router = useRouter();

  return (
    <div className="flex flex-col gap-5 h-full">
      <h2 className="text-lg font-bold capitalize">
        {router.pathname.split("/")[1].split("-").join(" ")}
      </h2>
      <ul className="flex flex-col gap-5 overflow-y-scroll h-full">
        {sections.map(([key, values]) => (
          <li key={key}>
            <h3
              className={`text-base lg:text-lg font-semibold ${
                router.pathname === "/grammar-checker" &&
                "text-orange-1 dark:text-orange-400"
              } ${
                router.pathname === "/text-summarizer" &&
                "text-purple-1 dark:text-purple-400"
              }`}
            >
              {key}
            </h3>
            <ul className="flex flex-col gap-2">
              {values.map((value, index) => (
                <li key={index}>
                  <p className="text-text-gray dark:text-white text-sm lg:text-base">
                    {value}
                  </p>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <RepositoryButton />
    </div>
  );
};

export default ModalContent;
