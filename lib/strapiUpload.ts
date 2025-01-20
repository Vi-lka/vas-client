"use client";

import { useState } from "react";
import axios from "axios";
import { getSession } from "next-auth/react";

export const strapi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_STRAPI_API_URL,
});

strapi.interceptors.request.use(async (config) => {
  const session = await getSession();
  config.headers.Authorization = `Bearer ${session?.strapiToken}`;
  return config;
});

export const putObjects = (userId: string, file: File) => {
  const formData = new FormData();
  formData.append("file", file)
  formData.append("ref", "plugin::users-permissions.user")
  formData.append("refId", userId)
  formData.append("field", "file")

  return strapi.post("/api/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    }
  });
};

type UploadFileT = {
  url: string
}

export const usePutObjects = () => {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const upload = async (userId: string, file: File | null | undefined, field: string) => {
    if (!file) return
    else {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("files", file)
      formData.append("ref", "plugin::users-permissions.user")
      formData.append("refId", userId)
      formData.append("field", field)
  
      return strapi.post<UploadFileT[]>("/api/upload", formData, {
        headers: {
          // "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const progress = !!progressEvent.total
            ? (progressEvent.loaded / progressEvent.total) * 100
            : 0;
          setProgress(progress);
          if (progress == 100) setIsLoading(false)
        },
      });
    }
  };

  return { upload, progress, isLoading };
};

export const useDeleteObject = () => {
  const deleteFile = async (fileId: string) => {
    return strapi.delete(`/api/upload/files/${fileId}`)
  }

  return { deleteFile };
}
