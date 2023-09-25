import { useBoundStore } from "@/zustand/useBoundStore";
import { useEffect } from "react";

export const useCleaner = () => {
  const { clearCorrections, clearSummary, clearTranslation } = useBoundStore();

  useEffect(() => {
    clearCorrections();
    clearSummary();
    // clearValue();
    clearTranslation();
  }, []);
};
