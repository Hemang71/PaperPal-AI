import { ChangeEvent } from "react";

interface UploadSectionProps {
  file: File | null;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  uploadFile: () => void;
}

function UploadSection({
  file,
  setFile,
  uploadFile,
}: UploadSectionProps) {
  return (
    <>
      <p>Upload a research paper</p>

      <input
        type="file"
        accept=".pdf"
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          if (e.target.files?.length) {
            setFile(e.target.files[0]);
          }
        }}
      />

      <br />
      <br />

      <button onClick={uploadFile}>
        Upload PDF
      </button>

      {file && (
        <>
          <br />
          <br />
          <small>Selected: {file.name}</small>
        </>
      )}
    </>
  );
}

export default UploadSection;