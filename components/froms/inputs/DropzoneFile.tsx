"use client";

import { useCallback, useEffect, useState } from "react";
import { MousePointerClick, UploadCloud } from "lucide-react";
import type { Accept } from "react-dropzone";
import { useDropzone } from "react-dropzone";
import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image"

type Value = {
  file?: File | null | undefined;
  url: string;
};

export default function DropzoneFile({
  isImage,
  formValue,
  formValueName,
  accept,
  maxSize,
  disabled,
  className,
  children,
}: {
  isImage: boolean,
  formValue: Value
  formValueName: string;
  accept: Accept;
  maxSize: number;
  disabled: boolean;
  className?: string;
  children?: React.ReactNode
}) {
  const [valueFile, setFile] = useState<File | null | undefined>();
  const [valueURL, setURL] = useState<string>();

  const { pending } = useFormStatus();

  const form = useFormContext();

  useEffect(() => {
    setFile(formValue.file);
    setURL(formValue.url);
  }, [formValue]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFileUrl = URL.createObjectURL(acceptedFiles[0]);
      setFile(acceptedFiles[0]);
      setURL(newFileUrl);
      form.setValue(
        formValueName,
        { file: acceptedFiles[0], url: newFileUrl },
        { shouldDirty: true, shouldValidate: true, shouldTouch: true },
      );
    },
    [form, formValueName],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxSize,
    multiple: false,
    disabled: pending || disabled
  });

  // const handleDelete = () => {
  //   setFile(null);
  //   setURL("");
  //   form.setValue(
  //     formValueName,
  //     { file: null, url: "" },
  //     { shouldDirty: true, shouldValidate: true, shouldTouch: true },
  //   );
  // };

  if (!!valueURL && valueURL.length > 0)
    return (
      <>
        {/* <span
          className="text-muted-foreground hover:text-foreground mx-auto my-1 flex w-fit cursor-pointer items-center justify-center text-xs transition-all hover:scale-110"
          onClick={handleDelete}
        >
          <X className="h-5 w-5" /> Удалить
        </span> */}
        <div
          {...getRootProps({
            className: cn(
              "flex flex-col justify-center items-center  lg:px-12 px-0 lg:py-10 py-2 border border-solid border-border rounded-md cursor-pointer bg-muted",
              className,
              form.getFieldState(formValueName).invalid
                ? "border-red-500"
                : ""
            ),
          })}
        >
          <input {...getInputProps()} />
          {isImage
            ? (<>
                <Image
                  src={valueURL}
                  width={180}
                  height={180}
                  alt={!!valueFile ? valueFile.name : valueURL.split("/")[2]}
                  className="mx-auto object-cover"
                />
                <p className="mt-3 md:max-w-96 max-w-28 break-words text-center text-xs font-light">
                  {!!valueFile ? valueFile.name : valueURL.split("/")[2]}
                </p>
            </>)
            : (
              <p className="mt-3 md:max-w-96 max-w-28 break-words text-center text-xs font-medium">
                {!!valueFile ? valueFile.name : valueURL.split("/")[2]}
              </p>
            )
          }
        </div>
        <Link href={valueURL} className="w-fit h-fit" passHref target="_blank">
          <Button variant="link" type="button" className="w-full">
            Открыть файл
          </Button>
        </Link>
      </>
    );
  else
    return (
      <div
        {...getRootProps({
          className: cn(
            "flex flex-col justify-center items-center p-12 border border-solid border-border rounded-md cursor-pointer bg-muted",
            className,
            form.getFieldState(formValueName).invalid
              ? "border-red-500"
              : ""
          ),
        })}
      >
        <input {...getInputProps()} />
        <UploadCloud className="text-muted-foreground mx-auto w-8 h-8" />
        {isDragActive ? (
          <p className="text-muted-foreground text-center text-xs">
            Скиньте файл сюда ...
          </p>
        ) : (
          <p className="text-muted-foreground text-center text-xs">
            <span className="underline-offset-3 underline">Drag & drop</span> or{" "}
            <span className="underline underline-offset-2">
              <MousePointerClick className="inline h-3 w-3" />
              Click
            </span>
          </p>
        )}
        {children}
      </div>
    );
}
