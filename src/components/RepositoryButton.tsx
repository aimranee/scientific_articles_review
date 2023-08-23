import Link from "next/link"
import GithubIcon from "../../public/github-icon.svg"
import { useRouter } from "next/router"

const RepositoryButton = () => {
  const router = useRouter()

  return (
    <p className="flex gap-2 w-full justify-center">
      Source
      <Link
        href="https://github.com/maryemelamri/scientific_articles_review"
        className={`font-semibold ${
          router.pathname === "/grammar-checker" && "text-pink-1 dark:text-pink-400"
        } ${router.pathname === "/text-summarizer" && "text-green-1 dark:text-green-400"} `}
        target="_blank"
      >
        <span className="flex justify-center items-center gap-2">
          <GithubIcon className="w-5 h-5" />
        
        </span>
      </Link>
    </p>
  )
}

export default RepositoryButton
