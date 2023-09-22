import { useBoundStore } from "@/zustand/useBoundStore";
import { useEffect } from "react";

export const useCleaner = () => {
  const { clearCorrections, clearSummary } = useBoundStore();

  useEffect(() => {
    clearCorrections();
    clearSummary();
    // clearValue();
  }, []);
};
