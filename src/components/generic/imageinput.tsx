import React, { forwardRef, Ref, useImperativeHandle, useState } from "react";

type Props = {
  onChange: (file: File) => void;
};

export interface RefMethods {
  resetPreview: () => void
}

export const CircularImageInput = forwardRef(({ onChange }: Props, ref: Ref<RefMethods>) => {

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      onChange(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  useImperativeHandle(ref, () => ({
    resetPreview () {
      setPreviewUrl(null)
    }
  }));

  return (
    <div className=" col-span-4 flex flex-col items-center justify-center">
      <label
        htmlFor="image"
        className="w-24 h-24 m-4 rounded-full overflow-hidden border-4 border-gray-400 hover:border-gray-600 focus-within:border-blue-500"
      >
        {previewUrl ? (
          <img src={previewUrl} alt="Selected file" className="h-full w-full object-cover" />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-gray-400">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 5v14M5 12h14"
              />
            </svg>
          </div>
        )}
      </label>
      <input
        type="file"
        id="image"
        name="image"
        accept="image/*"
        className="sr-only"
        onChange={handleFileSelect}
      />
    </div>
  );
})

