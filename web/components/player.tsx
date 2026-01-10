import { cn } from "@/lib/utilts";
import { Color } from "game/types";

export const Player = ({
  color,
  name,
  className,
}: {
  color: Color;
  name?: string;
  className?: string;
}) => {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div
        className={cn(
          "size-4 rounded-full",
          color === "white" ? "bg-neutral-50" : "bg-neutral-950"
        )}
      />
      <div className="text-xs font-medium capitalize">{name ?? color}</div>
    </div>
  );
};
