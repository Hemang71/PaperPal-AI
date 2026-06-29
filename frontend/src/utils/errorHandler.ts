import axios from "axios";

export const getErrorMessage = (
  err: unknown,
  defaultMsg: string
): string => {
  if (axios.isAxiosError(err)) {
    if (!err.response) {
      return "Backend server is offline or unreachable. Please check your connection.";
    }

    switch (err.response.status) {
      case 400:
        return (
          err.response.data?.detail ||
          "Invalid request. Please check your input."
        );

      case 413:
        return "File is too large. Please upload a smaller PDF.";

      case 500:
        return "Server error. Please try again later.";

      default:
        return err.response.data?.detail || defaultMsg;
    }
  }

  return defaultMsg;
};