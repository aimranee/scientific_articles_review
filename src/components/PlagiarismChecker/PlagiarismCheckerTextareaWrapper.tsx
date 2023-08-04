import { usePlagiarismChecker } from "@/hooks/usePlagiarismChecker"
import PlagiarismCheckerTextareaFooter from "./PlagiarismCheckerTextareaFooter"
import PlagiarismCheckerTextarea from "./PlagiarismCheckerTextarea"

const PlagiarismCheckerTextareaWrapper = (): JSX.Element => {
  const { onChange, loading, setTextToCorrect } = usePlagiarismChecker()

  return (
    <div className="border dark:border-gray-2 bg-white dark:bg-gray-1 rounded-md shadow-lg">
      <PlagiarismCheckerTextarea onChange={onChange} setTextToCorrect={setTextToCorrect} />
      <PlagiarismCheckerTextareaFooter loading={loading} />
    </div>
  )
}

export default PlagiarismCheckerTextareaWrapper
