import { useVocabularyChecker } from "@/hooks/useVocabularyChecker";
import VocabularyCheckerTextareaFooter from "./VocabularyCheckerTextareaFooter";
import VocabularyCheckerTextarea from "./VocabularyCheckerTextarea";

const VocabularyCheckerTextareaWrapper = (): JSX.Element => {
  const { onChange, loading, setTextToCorrect } = useVocabularyChecker();

  return (
    <div className="border dark:border-gray-2 bg-white dark:bg-gray-1 rounded-md shadow-lg">
      <VocabularyCheckerTextarea
        onChange={onChange}
        setTextToCorrect={setTextToCorrect}
      />
      <VocabularyCheckerTextareaFooter loading={loading} />
    </div>
  );
};

export default VocabularyCheckerTextareaWrapper;
