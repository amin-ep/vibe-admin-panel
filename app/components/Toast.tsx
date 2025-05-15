import { Alert, Fade, Snackbar } from "@mui/material";
import { useToast } from "~/store/useToast";

function Toast() {
  const { message, severity, isOpen, closeToast } = useToast();

  return (
    <Snackbar
      open={isOpen}
      onClose={closeToast}
      autoHideDuration={5000}
      transitionDuration={500}
      slots={{ transition: Fade }}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Alert
        severity={severity}
        variant="filled"
        sx={{ width: "100%" }}
        onClose={closeToast}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}

export default Toast;
