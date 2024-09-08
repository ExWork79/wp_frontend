import axios from "axios";
import { AppError } from "./error";
import { ErrorCode } from "../contracts";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

axiosClient.interceptors.response.use(
  (response) => response,
  (e) => {
    const error = new AppError(
      e.response?.status === 404
        ? ErrorCode.RESOURCE_NOT_FOUND
        : e.response?.status === 500
          ? ErrorCode.INTERNAL_ERROR
          : ErrorCode.UNKNOWN,
      e.response?.data?.message || e.message,
      {
        ...(e.response?.data?.details || e.details),
        data: e.response?.data?.data,
      },
    );

    throw error;
  },
);

export default axiosClient;
