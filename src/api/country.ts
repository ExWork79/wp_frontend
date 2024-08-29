import { Country, PaginationResult } from "../contracts";
import { axiosClient } from "../utils";

const fetchCountries = async (page?: number, limit?: number): Promise<PaginationResult<Country>> => {
  const response = await axiosClient.get<PaginationResult<Country>>(
    `/countries?${page ? `page=${page}` : ""}${limit ? `&limit=${limit}` : ""}`,
  );

  if (!response) {
    throw new Error("Failed to fetch countries");
  }

  return response.data;
};

const fetchCountry = async (id: string): Promise<Country> => {
  const response = await axiosClient.get<Country>(`/countries/${id}`);

  if (!response) {
    throw new Error("Failed to fetch country");
  }

  return response.data;
};

const fetchCountryByName = async (name: string): Promise<Country> => {
  const response = await axiosClient.get<Country>(`/countries/?name=${name}`);

  if (!response) {
    throw new Error("Failed to fetch country");
  }

  return response.data;
};

const fetchCountryByCCA2 = async (code: string): Promise<Country> => {
  const response = await axiosClient.get<Country>(`/countries/?cca2=${code}`);

  if (!response) {
    throw new Error("Failed to fetch country");
  }

  return response.data;
};

const fetchCountryByCCA3 = async (code: string): Promise<Country> => {
  const response = await axiosClient.get<Country>(`/countries/?cca3=${code}`);

  if (!response) {
    throw new Error("Failed to fetch country");
  }

  return response.data;
};

export { fetchCountries, fetchCountry, fetchCountryByName, fetchCountryByCCA2, fetchCountryByCCA3 };
