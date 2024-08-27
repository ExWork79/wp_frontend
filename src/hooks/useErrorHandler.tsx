import useToaster from "./useToaster";

import { AppError } from "../utils";
import { ErrorCode, ToastStatus } from "../contracts";
import { useLocation, useNavigate } from "react-router-dom";

type ReturnType = {
  handleError: (error: Error) => void;
};

const useErrorHandler = (): ReturnType => {
  const { showToast } = useToaster();
  const navigate = useNavigate();
  const location = useLocation();

  const handleError = (error: Error) => {
    if (error instanceof AppError) {
      switch (error._statusCode) {
        case ErrorCode.RESOURCE_NOT_FOUND:
          navigate("/page-not-found", {
            state: { prevRoute: location.pathname },
            replace: true,
          });
          break;
        case ErrorCode.INTERNAL_ERROR:
          showToast(ToastStatus.ERROR, "Internal server error");
          break;
        default:
          showToast(ToastStatus.ERROR, "An error occurred");
          break;
      }
    }

    return showToast(ToastStatus.ERROR, error.message);
  };

  return { handleError };
};

export default useErrorHandler;
