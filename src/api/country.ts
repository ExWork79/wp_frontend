import { Country } from "../contracts";
import { axiosClient } from "../utils";

const fetchCountries = async () => {
  const response = await axiosClient.get<Country[]>("/countries");

  if (!response) {
    throw new Error("Failed to fetch countries");
  }

  return response.data;
};

const fetchCountry = async (id: string) => {
  const response = await axiosClient.get<Country>(`/countries/${id}`);

  if (!response) {
    throw new Error("Failed to fetch country");
  }

  return response.data;
};

export { fetchCountries, fetchCountry };
