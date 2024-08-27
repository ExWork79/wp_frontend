import { notification } from "antd";

type NotificationType = "success" | "info" | "warning" | "error";

type UseToaster = {
  showToast: (type: NotificationType, message: string) => void;
};

const useToaster = (): UseToaster => {
  const showToast = (
    type: NotificationType,
    message: string,
    description?: string,
  ) => {
    notification[type]({
      message,
      duration: 2,
      description: description || "",
    });
  };

  return { showToast };
};

export default useToaster;
