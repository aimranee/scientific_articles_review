import { useGrammarChecker } from "@/hooks/useGrammarChecker";
import GrammarCheckerTextareaFooter from "./GrammarCheckerTextareaFooter";
import GrammarCheckerTextarea from "./GrammarCheckerTextarea";
import { useRouter } from "next/router";

const GrammarCheckerTextareaWrapper = (): JSX.Element => {
  const { onChange, loading, setTextToCorrect } = useGrammarChecker();
  const router = useRouter();
  const { search } = router.query;
  const setText = search ? search.toString() : "";

  return (
    <div className="border dark:border-gray-2 bg-white dark:bg-gray-1 rounded-md shadow-lg">
      <GrammarCheckerTextarea
        onChange={onChange}
        setTextToCorrect={setTextToCorrect}
      />
      <GrammarCheckerTextareaFooter loading={loading} />
    </div>
  );
};

export default GrammarCheckerTextareaWrapper;
