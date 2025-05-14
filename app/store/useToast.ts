import { create } from "zustand";

function throwToast(msg: string, severity: ToastState["severity"]) {
  return {
    severity,
    isOpen: true,
    message: msg,
  };
}

const useToast = create<ToastState>((set) => ({
  message: "",
  severity: "info",
  isOpen: false,
  success: (msg: string) => {
    set(() => throwToast(msg, "success"));
  },
  error: (msg: string) => set(throwToast(msg, "error")),
  info: (msg: string) => {
    throwToast(msg, "info");
  },
  warning: (msg: string) => {
    throwToast(msg, "warning");
  },
  closeToast: () => {
    set(() => ({
      isOpen: false,
    }));
  },
}));

export { useToast };
