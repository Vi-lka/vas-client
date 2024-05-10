import { cn } from "@/lib/utils";
import type { CSSProperties } from "react";
import React from "react";

// Modify these
const MAIN_CIRCLE_SIZE = 210;
const MAIN_CIRCLE_OPACITY = 0.24;
const NUM_CIRCLES = 8;

const Ripple = React.memo(({ 
  className,
  classNameItem 
}: {
  className?: string
  classNameItem?: string
}) => {
  return (
    <div className={cn("absolute left-1/2 top-1/2 h-full w-full overflow-visible", className)}>
      {Array.from({ length: NUM_CIRCLES }, (_, i) => (
        <div
          key={i}
          className={cn(`absolute -translate-x-1/2 -translate-y-1/2 animate-ripple rounded-full bg-primary/20 z-0`, classNameItem)}
          style={
            {
              width: MAIN_CIRCLE_SIZE + i * 70,
              height: MAIN_CIRCLE_SIZE + i * 70,
              opacity: MAIN_CIRCLE_OPACITY - i * 0.03,
              animationDelay: `${i * 0.06}s`,
            } as CSSProperties
          }
        ></div>
      ))}
    </div>
  );
});
Ripple.displayName = "Ripple"

export default Ripple;
