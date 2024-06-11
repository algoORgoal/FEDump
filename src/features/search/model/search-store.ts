import { create } from "zustand";

interface State {
  query: string;
}
interface Actions {
  updateQuery: (newQuery: string) => void;
}
type Store = State & Actions;
const defaultInitState = {
  query: "",
} satisfies State;

export const useStore = create<Store>()((set) => ({
  ...defaultInitState,
  updateQuery: (newQuery) => set((state) => ({ ...state, query: newQuery })),
}));
