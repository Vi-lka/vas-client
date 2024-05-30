import { clsx } from "clsx"
import type { ClassValue } from "clsx";
import React from "react";
import { twMerge } from "tailwind-merge"

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
  switch (code) {
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