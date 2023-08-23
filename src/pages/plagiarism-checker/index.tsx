import GrammarCheckerCheckerInfo from "@/../public/GrammarCheckerInfo.json"
import PlagiarismCheckerTextareaWrapper from "@/components/PlagiarismChecker/PlagiarismCheckerTextareaWrapper"
import TextareaSection from "@/components/TextareaSection"
import Aside from "@/components/PlagiarismChecker/Aside"
// import makePlagiarismCheck from "@/services/askToTurnitin"
import Navbar from "@/components/Navbar"
import { HeaderDescription, HeaderTitle } from "@/enums.d"
import { useCleaner } from "@/hooks/useCleaner"
import { type FC } from "react"

const PlagiarismChecker: FC = () => {
  useCleaner()

  return (
    <div className="flex flex-wrap gap-y-5 lg:flex-nowrap bg-white-1 dark:bg-black text-white w-full h-screen md:pt-0">
      <div id="modal-root"></div>
      <div className="flex flex-col w-full">
        <Navbar />
        <main className="w-full h-max md:h-full flex justify-center items-center px-5 relative">
          <TextareaSection>
            <TextareaSection.Header
              title={HeaderTitle.PLAGIARIM_CHECKER}
              description={HeaderDescription.PLAGIARIM_CHECKER}
              className="bg-pink-1"
              content={GrammarCheckerCheckerInfo}
            />
            <PlagiarismCheckerTextareaWrapper />
         
          </TextareaSection>
        </main>
      </div>
      <Aside />
    </div>
  )
}

export default PlagiarismChecker
