import React from "react";
import { UploadDropzone } from "../UploadThings";
import { XCircle } from "lucide-react";
import Image from "next/image";

import "@uploadthing/react/styles.css";

export type FileUploadProps = {
  endpoint: "messageFile" | "serverImage";
  onChange: (url?: string) => void;
  value: string;
};

const FileUpload = ({ endpoint, onChange, value }: FileUploadProps) => {
  const fileType = value?.split(".").pop();

  if (value && fileType !== "pdf") {
    return (
      <div className="h-32 flex items-center justify-center">
        <div className="relative w-32 h-32">
          <button
            className="absolute z-10 right-0 shadow-sm"
            onClick={() => onChange("")}
          >
            <XCircle className="text-red-600 " />
          </button>
          <Image fill src={value} alt="uploadthing" className="rounded-full" />
        </div>
      </div>
    );
  }
  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => onChange(res?.[0].url)}
      onUploadError={(error: Error) => {
        console.log(error);
      }}
    />
  );
};

export default FileUpload;
