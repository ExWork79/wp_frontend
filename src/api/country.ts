import { Country, PaginationResult } from "../contracts";
import { axiosClient } from "../utils";

const fetchCountries = async (page?: number, limit?: number) => {
  const response = await axiosClient.get<PaginationResult<Country>>(
    `/countries?${page ? `page=${page}` : ""}${limit ? `&limit=${limit}` : ""}`,
  );

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
