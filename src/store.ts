import { create } from 'zustand';
import { Country } from './contracts';
import { fetchCountries } from './api';

type InitialState = {
  countries: Country[];
}

type Store = {
  value: InitialState;
  actions: {
    fetchCountries: () => Promise<Country[]>;
  }
}

const useStore = create<Store>((set) => (
  {
    value: {
      countries: []
    },
    actions: {
      fetchCountries: async () => {
        const countries = await fetchCountries();

        set((state) => ({
          value: {
            ...state.value,
            countries
          }
        }));

        return countries;
      }
    }
  }
));

export const useGlobalStore = useStore;