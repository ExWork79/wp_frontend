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
  };
};

const useStore = create<Store>((set) => ({
  value: {
    countries: [],
  },
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
  },
}));

export const useGlobalStore = useStore;
