import { AddCheckProps, CheckProps, ChecksProps } from "@/interfaces";
import { StateCreator } from "zustand";

export type ChecksSlice = {
  checks: ChecksProps;
  removeCheck: (checkId: CheckProps["id"]) => void;
  addCheck: AddCheckProps;
  clearChecks: () => void;
};

const initialState = {
  checks: {
    checksList: [],
    checkedText: "",
  },
};

export const createChecksSlice: StateCreator<ChecksSlice> = (set) => ({
  ...initialState,
  removeCheck: (checkId) =>
    set((state) => {
      const filteredChecks = state.checks.checksList.filter(
        (prevCheck: CheckProps) => prevCheck.id !== checkId
      );
      return {
        checks: { ...state.checks, ChecksList: filteredChecks },
      };
    }),
  addCheck: (newChecks) => set({ checks: newChecks }),
  clearChecks: () => set(initialState),
});
