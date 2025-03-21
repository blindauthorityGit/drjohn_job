import React, { useState, useRef, forwardRef, useImperativeHandle, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { FaTimes } from "react-icons/fa";
import DL from "@/assets/dl.svg";

const StepFive = forwardRef(({ formData }, ref) => {
    // Initialize fileData from formData if available.
    const [fileData, setFileData] = useState(formData.fileData || []);
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState(null);

    const acceptedTypes = {
        "image/jpeg": [".jpeg", ".jpg"],
        "image/png": [".png"],
        "application/pdf": [".pdf"],
    };
    const maxSize = 5 * 1024 * 1024; // 5MB

    // Dummy function to create a preview URL for immediate display.
    // (This is separate from the actual upload, which happens at final submission.)
    const createPreviewUrl = (file) => {
        return file.type.startsWith("image/") ? URL.createObjectURL(file) : null;
    };

    const onDrop = async (acceptedFiles, rejectedFiles) => {
        if (rejectedFiles && rejectedFiles.length > 0) {
            setUploadError("Ungültiges Format oder Datei zu groß. (Max. 5MB; PDF, JPG, PNG)");
            return;
        }
        if (acceptedFiles && acceptedFiles.length > 0) {
            setUploadError(null);
            setUploading(true);
            const newFiles = [];
            for (const file of acceptedFiles) {
                if (file.size > maxSize) {
                    setUploadError("Datei ist zu groß. Maximal 5MB erlaubt.");
                    continue;
                }
                try {
                    // Create a preview URL for display purposes.
                    const previewUrl = createPreviewUrl(file);
                    const fileInfo = {
                        file, // Store the actual File object for later upload
                        fileName: file.name,
                        type: file.type,
                        url: previewUrl, // temporary preview URL (blob)
                    };
                    newFiles.push(fileInfo);
                } catch (error) {
                    setUploadError("Upload fehlgeschlagen.");
                }
            }
            setFileData((prev) => [...prev, ...newFiles]);
            setUploading(false);
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: acceptedTypes,
        maxSize,
    });

    const removeFile = (index) => {
        setFileData((prev) => prev.filter((_, i) => i !== index));
    };

    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem("stepFiveFiles", JSON.stringify(fileData));
        }
    }, [fileData]);

    useImperativeHandle(ref, () => ({
        validate: () => true,
        // Return an object so that global formData gets a "fileData" property.
        getData: () => ({ fileData }),
    }));

    return (
        <div className="mb-6 lg:mt-8">
            <label className="text-lg tracking-wider text-black relative flex">
                <div className="w-4 h-4 mr-2 bg-[#D9DED7]" />
                Wenn Sie möchten, können Sie hier Ihre Bewerbungsunterlagen hochladen
            </label>
            <p className="text-sm text-gray-600 mb-4">(Akzeptierte Formate: PDF, JPG, PNG | Max. 5MB)</p>
            <div
                {...getRootProps()}
                className={`border-dashed py-24 mt-8 border-4 p-8 rounded-md relative cursor-pointer ${
                    isDragActive ? "bg-blue-50 border-blue-500" : "bg-[#D9DED7] border-gray-300"
                }`}
            >
                <input {...getInputProps()} />
                {uploading && (
                    <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
                        <div className="loader"></div>
                    </div>
                )}
                {!uploading && (
                    <div className="text-center text-black tracking-wider flex flex-col items-center">
                        <img className="max-w-[128px] mb-8" src={DL.src} alt="Download" />
                        <p className="block lg:hidden">Hier Daten hochladen</p>
                        <p className="hidden lg:block">
                            Ziehen Sie Ihre Datei(en) hierher oder klicken Sie, um sie auszuwählen.
                        </p>
                    </div>
                )}
            </div>
            {uploadError && <p className="mt-2 text-xs text-red-500">{uploadError}</p>}
            {fileData.length > 0 && (
                <div className="mt-4 grid grid-cols-2 gap-4">
                    {fileData.map((data, index) => (
                        <div key={index} className="relative">
                            {data.type.startsWith("image/") ? (
                                <img src={data.url} alt={data.fileName} className="w-20 h-20 object-cover rounded" />
                            ) : (
                                <div className="w-20 h-20 flex items-center justify-center bg-gray-200 rounded">
                                    <span className="text-3xl">📄</span>
                                </div>
                            )}
                            <button
                                onClick={() => removeFile(index)}
                                className="absolute top-0 right-0 bg-white rounded-full p-1 shadow"
                            >
                                <FaTimes className="text-red-500" />
                            </button>
                            <p className="text-sm mt-1">{data.fileName}</p>
                        </div>
                    ))}
                </div>
            )}
            <style jsx>{`
                .loader {
                    border: 4px solid #f3f3f3;
                    border-top: 4px solid #3498db;
                    border-radius: 50%;
                    width: 24px;
                    height: 24px;
                    animation: spin 1s linear infinite;
                }
                @keyframes spin {
                    0% {
                        transform: rotate(0deg);
                    }
                    100% {
                        transform: rotate(360deg);
                    }
                }
            `}</style>
        </div>
    );
});

export default StepFive;
