import Link from "next/link";
import GithubIcon from "../../public/github-icon.svg";
import { useRouter } from "next/router";

const RepositoryButton = () => {
  const router = useRouter();

  return (
    <p className="flex gap-2 w-full justify-center">
      Source
      <Link
        href="https://github.com/maryemelamri/scientific_articles_review"
        className={`font-semibold ${
          router.pathname === "/grammar-checker" &&
          "text-orange-1 dark:text-orange-400"
        } ${
          router.pathname === "/plagiarism-checke" &&
          "text-blue-1 dark:text-blue-400"
        }${
          router.pathname === "/text-summarizer" &&
          "text-purple-1 dark:text-purple-400"
        }${
          router.pathname === "/pdf-upload" &&
          "text-yellow-1 dark:text-yellow-400"
        }${
          router.pathname === "/vocabulary-checker" &&
          "text-yellow-500 dark:text-yellow-500"
        } ${
          router.pathname === "/translator" && "text-red-500 dark:text-red-400"
        }`}
        target="_blank"
      >
        <span className="flex justify-center items-center gap-2">
          <GithubIcon className="w-5 h-5" />
        </span>
      </Link>
    </p>
  );
};

export default RepositoryButton;
