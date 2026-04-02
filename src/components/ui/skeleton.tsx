import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn("animate-pulse rounded-lg", className)}
      style={{ background: "rgba(0,0,0,0.06)" }}
    />
  );
}
