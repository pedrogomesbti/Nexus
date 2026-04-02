import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { type ReactNode } from "react";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium transition-colors",
  {
    variants: {
      variant: {
        cliente:
          "bg-text text-white dark:bg-text-dark dark:text-bg-dark",
        fornecedor:
          "bg-text-secondary/20 text-text-secondary ring-1 ring-inset ring-text-secondary/10 dark:bg-text-dark/10 dark:text-text-dark/70",
        neutral:
          "bg-border text-text-secondary dark:bg-border-dark dark:text-text-dark/60",
        count:
          "bg-text text-white font-semibold tabular-nums text-[10px] min-w-[22px] justify-center dark:bg-text-dark dark:text-bg-dark",
      },
    },
    defaultVariants: {
      variant: "neutral",
    },
  }
);

interface BadgeProps extends VariantProps<typeof badgeVariants> {
  children: ReactNode;
  className?: string;
}

export function Badge({ variant, className, children }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)}>
      {children}
    </span>
  );
}
