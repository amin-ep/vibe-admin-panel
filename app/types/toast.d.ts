type ToastState = {
  severity: "error" | "info" | "success" | "warning";
  message: string;
  isOpen: boolean;
  success: (msg: string) => void;
  info: (msg: string) => void;
  error: (msg: string) => void;
  warning: (msg: string) => void;
  closeToast: () => void;
};
