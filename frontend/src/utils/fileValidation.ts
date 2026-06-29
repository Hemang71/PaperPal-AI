export const validatePdf = (file: File | null): string | null => {
  if (!file) {
    return "Please select a PDF file.";
  }

  if (
    file.type !== "application/pdf" &&
    !file.name.toLowerCase().endsWith(".pdf")
  ) {
    return "Invalid file type. Please upload a PDF file only.";
  }

  const minSize = 10 * 1024;
  const maxSize = 50 * 1024 * 1024;

  if (file.size < minSize) {
    return "File is too small. Please upload a valid PDF.";
  }

  if (file.size > maxSize) {
    return "File is too large. Maximum size is 50MB.";
  }

  return null;
};