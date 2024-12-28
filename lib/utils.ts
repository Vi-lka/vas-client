import { clsx } from "clsx"
import type { ClassValue } from "clsx";
import React from "react";
import { twMerge } from "tailwind-merge"
import type { StatusEnum, StatusTranslitEnum } from "./types/users";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getShortText(
  description: string,
  length?: number,
) {
  const array = description.split(" ");

  const sliceLength = length ? length : 30;

  if (array.length >= sliceLength + 1) {
    return array.slice(0, sliceLength).join(" ") + "...";
  } else return array.join(" ");
}

export function calcWidth({index, current, count}: {index: number, current: number, count: number}) {
  const per = (100 / count) / count
  let perCount = 0

  if (index === (current - 1)) {
      Array.from({ length: count }).forEach((_, i) => {
          perCount = perCount + Math.abs(index - i)
      })

      return per * count + per * perCount
  } else {
      perCount = Math.abs((current - 1) - index)

      return per * count - per * perCount
  }
}

export function maxDifference(arr: number[]) {
  let diff = 0

  if (arr.length !== 0) {

    diff = Math.max(...arr) - Math.min(...arr)
    return diff;

  } else return 0
}

/**
 * Gets only the valid children of a component,
 * and ignores any nullish or falsy child.
 *
 * @param children the children
 */
export function getValidChildren(children: React.ReactNode) {
  return React.Children.toArray(children).filter((child) =>
    React.isValidElement(child),
  ) as React.ReactElement[]
}

export function translateError(code: string, defaultMessage: string) {
  console.log("code: ", code)
  switch (code) {
    case "Email or Username are already taken":
      return "Адрес электронной почты уже занят, проверьте почту или войдите если уже подтвердили почту";

    case "Invalid identifier or password":
      return "Неверный email или пароль";

    case "Your account email is not confirmed":
      return "Адрес электронной почты вашего аккаунта не подтвержден. Проверьте почту."

    case "Incorrect code provided":
      return "Указан неверный код"

    case "fetch failed":
      return "Не удалось выполнить операцию, проблемы с сетью"

    default:
      return defaultMessage;
  }
}

export function csvMaker(data: { [key: string]: string }[]) {
  const csvRows = [];

  const headers = Object.keys(data[0]);

  // For making csv format, headers must be
  // separated by comma and pushing it into array
  csvRows.push(headers.join(','));

  // Looping through the data values and make
  // sure to align values with respect to headers
  for (const row of data) {
    const values = headers.map(e => {
        return row[e]
    })
    csvRows.push(values.join(','))
  }

  // returning the array joining with new line 
  return csvRows.join('\n')
}

export function downloadCSV(csvString: string, fileName: string) {

  const normalizeStr = csvString.replace("\n", " ")

  // Create a Blob from the CSV string
  const blob = new Blob([normalizeStr], { type: 'text/csv' });

  // Generate a download link and initiate the download
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName || 'download.csv';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export function resetPaginationts(params: URLSearchParams) {
  const hasPage = params.has("page");

  if (hasPage) params.set("page", "1");
}

export function translitStatusToNormal(status: StatusTranslitEnum | null): StatusEnum | null {
  switch (status) {
    case "poluchena":
      return "получена";

    case "odobrena":
      return "одобрена";

    case "na_dorabotke":
      return "на доработке";
  
    default:
      return null;
  }
}