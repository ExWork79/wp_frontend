import { create } from "zustand";
import { Country } from "./contracts";
import { fetchCountries } from "./api";

type InitialState = {
  countries: Country[];
};

type Store = {
  value: InitialState;
  actions: {
    fetchCountries: () => Promise<Country[]>;
    clearStore: () => void;
  };
};

const defaultState: InitialState = {
  countries: [],
};

const useStore = create<Store>((set) => ({
  value: defaultState,
  actions: {
    fetchCountries: async () => {
      const result = await fetchCountries();

      set((state) => ({
        value: {
          ...state.value,
          countries: result.docs,
        },
      }));

      return result.docs;
    },
    clearStore() {
      set(() => ({
        value: defaultState,
      }));
    },
  },
}));

export const useGlobalStore = useStore;
