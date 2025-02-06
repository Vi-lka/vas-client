/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useCallback, useEffect, useState } from "react";
import { MousePointerClick, UploadCloud, X } from "lucide-react";
import type { Accept } from "react-dropzone";
import { useDropzone } from "react-dropzone";
import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image"
import { useDeleteObject } from "@/lib/strapiUpload";
import { toast } from "sonner";
import AuthError from "@/components/errors/AuthError";

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
  id,
  className,
  children,
}: {
  isImage: boolean,
  formValue: Value
  formValueName: string;
  accept: Accept;
  maxSize: number;
  disabled: boolean;
  id?: string,
  className?: string;
  children?: React.ReactNode
}) {
  const [valueFile, setFile] = useState<File | null | undefined>();
  const [valueURL, setURL] = useState<string>();
  const [popoverOpen, setPopoverOpen] = useState(false)
 
  const { pending } = useFormStatus();

  const { deleteFile } = useDeleteObject();

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

  const handleDelete = () => {
    if (id) {
      toast.promise(deleteFile(id), {
        loading: 'Удаляем файл...',
        success: () => {
          setFile(null);
          setURL("");
          form.setValue(
            formValueName,
            { file: null, url: "" },
            { shouldDirty: true, shouldValidate: true, shouldTouch: true },
          );
          setPopoverOpen(false);

          return `Успешно!`;
        },
        error: (err) => {
          return <AuthError data={err as Error} />
        }
      });
    } else {
      setFile(null);
      setURL("");
      form.setValue(
        formValueName,
        { file: null, url: "" },
        { shouldDirty: true, shouldValidate: true, shouldTouch: true },
      );
      setPopoverOpen(false)
    }
  };

  if (!!valueURL && valueURL.length > 0)
    return (
      <>
        {/* <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
          <PopoverTrigger asChild>
            <span
              className="text-muted-foreground hover:text-foreground mx-auto my-1 flex w-fit cursor-pointer items-center justify-center text-xs transition-all hover:scale-110"
            >
              <X className="h-5 w-5" /> Удалить
            </span>
          </PopoverTrigger>
          <PopoverContent>
            <p className="text-center mb-1 text-sm">
              Вы уверены?
            </p>
            {id && (
              <p className="text-center mb-3 text-xs text-destructive">
                Обязательно сохраните изменения после удаления!
              </p>
            )}
            <div className="flex justify-center gap-3">
              <Button
                variant="destructive"
                onClick={handleDelete}
              >
                Удалить
              </Button>
              <PopoverClose asChild>
                <Button
                  variant="secondary"
                >
                  Отмена
                </Button>
              </PopoverClose>
            </div>
          </PopoverContent>
        </Popover> */}
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
                <p className="mt-3 w-full break-words text-center text-xs font-light">
                  {!!valueFile ? valueFile.name : valueURL.split("/")[2]}
                </p>
                {children}
            </>)
            : (
              <>
                <p className="mt-3 w-full break-words text-center text-xs font-medium">
                  {!!valueFile ? valueFile.name : valueURL.split("/")[2]}
                </p>
                {children}
              </>
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
