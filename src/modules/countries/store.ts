import { create } from "zustand";
import { Country } from "../../contracts";
import { fetchCountries, fetchCountryByCCA2 } from "../../api";

type InitialState = {
  countries: Country[];
  currentCountry: Country | null;
};

type Store = {
  value: InitialState;
  actions: {
    fetchCountries: () => Promise<Country[]>;
    fetchCountry: (cca2: string) => Promise<Country>;
    clearCurrentCountry: () => void;
    clearCountryState: () => void;
  };
};

const defaultState: InitialState = {
  countries: [],
  currentCountry: null,
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
    fetchCountry: async (cca2: string) => {
      const result = await fetchCountryByCCA2(cca2);

      set((state) => ({
        value: {
          ...state.value,
          currentCountry: result,
        },
      }));

      return result;
    },
    clearCurrentCountry() {
      set((state) => ({
        value: {
          ...state.value,
          currentCountry: null,
        },
      }));
    },
    clearCountryState() {
      set({
        value: defaultState,
      });
    },
  },
}));

export const useCountryStore = useStore;
