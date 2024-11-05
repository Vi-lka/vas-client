"use client";

import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export type SortData = {
    val?: string | undefined;
    text?: string | undefined;
}

export default function Sort({
  data,
  defaultValue,
  side = "bottom",
  align = "end",
  className,
}: {
  data: SortData[];
  defaultValue?: string;
  side?: "bottom" | "top" | "right" | "left";
  align?: "end" | "center" | "start";
  className?: string;
}) {
  const [isPending, startTransition] = React.useTransition();

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const sort = searchParams.get("sort") ?? undefined;

  const handleSortParams = React.useCallback(
    (value: string) => {
      const params = new URLSearchParams(window.location.search);
      if (value.length > 0) {
        params.set("sort", value);
        startTransition(() => {
          router.push(`${pathname}?${params.toString()}`, { scroll: false });
        });
      } else {
        params.delete("sort");
      }
    },
    [pathname, router],
  );

  if (isPending)
    return <Loader2 className={cn("h-10 w-5 animate-spin", className)} />;

  return (
    <Select
      defaultValue={defaultValue}
      value={sort}
      onValueChange={handleSortParams}
    >
      <SelectTrigger className={cn("w-fit rounded-lg", className)}>
        <SelectValue placeholder="Сортировать по:" />
      </SelectTrigger>
      <SelectContent side={side} align={align} className="rounded-lg p-1">
        {data.map((elem, index) =>
          elem.val ? (
            <SelectItem
              key={index}
              value={`${elem.val}`}
              className="font-Inter cursor-pointer"
              // Prevent propagation: https://github.com/radix-ui/primitives/issues/1658#issuecomment-1664079551
              ref={(ref) => {
                if (!ref) return;
                ref.ontouchstart = (e) => {
                  e.preventDefault();
                };
              }}
            >
              {elem.text}
            </SelectItem>
          ) : (
            <Separator key={index} className="my-1" />
          ),
        )}
        {sort && sort !== defaultValue ? (
          <Button
            className="z-[100] mt-1 h-8 w-full rounded-md px-2 py-0 text-xs font-normal hover:ring-2"
            onClick={() => {
              const params = new URLSearchParams(window.location.search);
              params.delete("sort");
              startTransition(() => {
                router.push(`${pathname}?${params.toString()}`, {
                  scroll: false,
                });
              });
            }}
          >
            Сброс
          </Button>
        ) : null}
      </SelectContent>
    </Select>
  );
}
