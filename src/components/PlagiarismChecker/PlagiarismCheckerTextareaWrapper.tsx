import { usePlagiarismChecker } from "@/hooks/usePlagiarismChecker"
import PlagiarismCheckerTextareaFooter from "./PlagiarismCheckerTextareaFooter"
import PlagiarismCheckerTextarea from "./PlagiarismCheckerTextarea"
// import {text_to_check} from "@/services/askToTurnitin"


const PlagiarismCheckerTextareaWrapper = (): JSX.Element => {
  const { onChange, loading, setTextToCorrect } = usePlagiarismChecker()
// const {text_to_check} = per
  return (
    <div className="border dark:border-gray-2 bg-white dark:bg-gray-1 rounded-md shadow-lg">
      {/* <PlagiarismCheckerTextarea onChange={onChange} setTextToCorrect={setTextToCorrect} />
      <PlagiarismCheckerTextareaFooter loading={loading} /> */}
      {/* {text_to_check} */}

    </div>
  )
}

export default PlagiarismCheckerTextareaWrapper
