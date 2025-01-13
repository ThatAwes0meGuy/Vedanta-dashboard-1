import React, { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";

const ImageUploader = () => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [downloadURL, setDownloadURL] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return alert("Please select an image!");

    setIsUploading(true);
    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        console.error("Upload failed:", error);
        alert("Upload failed!");
        setIsUploading(false);
      },
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        setDownloadURL(url);
        setIsUploading(false);
        alert("Image uploaded successfully!");
      }
    );
  };

  return (
    <div className="flex flex-col items-center p-2">
      <label className="relative cursor-pointer bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
        {isUploading ? "Uploading..." : "Upload Image"}
        <input
          type="file"
          accept="image/*"
          onChange={handleUpload}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={isUploading}
        />
      </label>
      {uploadProgress > 0 && (
        <p className="mt-2 text-sm text-gray-700">
          Upload Progress: {uploadProgress.toFixed(2)}%
        </p>
      )}
      {downloadURL && (
        <p className="mt-4 text-sm text-green-500">
          Image URL:{" "}
          <a href={downloadURL} target="_blank" rel="noreferrer" className="underline">
            {downloadURL}
          </a>
        </p>
      )}
    </div>
  );
};

export default ImageUploader;
