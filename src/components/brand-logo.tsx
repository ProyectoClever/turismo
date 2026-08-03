import Link from "next/link";
import { cn } from "@/lib/utils";

const sizeMap = {
  sm: {
    mark: "h-8 w-[27px]",
    text: "text-lg tracking-[-0.4px]",
    gap: "gap-2",
  },
  md: {
    mark: "h-[42px] w-9",
    text: "text-[22px] tracking-[-0.5px]",
    gap: "gap-2.5",
  },
  lg: {
    mark: "h-[52px] w-11",
    text: "text-[26px] tracking-[-0.6px]",
    gap: "gap-3",
  },
} as const;

export type BrandLogoSize = keyof typeof sizeMap;

type BrandLogoProps = {
  size?: BrandLogoSize;
  className?: string;
  href?: string;
};

function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      className={cn("shrink-0", className)}
      viewBox="26.5 16 102 141"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M77.5 16C49.33 16 26.5 38.72 26.5 66.75C26.5 102.47 62.08 142.12 73.21 153.91C75.57 156.42 79.43 156.42 81.79 153.91C92.92 142.12 128.5 102.47 128.5 66.75C128.5 38.72 105.67 16 77.5 16Z"
        fill="#27C0CF"
      />
      <g transform="translate(77.5 70) rotate(-32) scale(1)">
        <path
          d="M0 -24.8C1.9 -24.8 3.4 -23.3 3.4 -21.4L3.4 -6.8L25.2 4.15C26.6 4.9 27.3 6.5 26.85 8L26.2 10.1L3.4 5.15L3.4 15.35L11.4 21.9C12.5 22.75 13 24.15 12.7 25.45L12.15 27.5L0 22.78L-12.15 27.5L-12.7 25.45C-13 24.15 -12.5 22.75 -11.4 21.9L-3.4 15.35L-3.4 5.15L-26.2 10.1L-26.85 8C-27.3 6.5 -26.6 4.9 -25.2 4.15L-3.4 -6.8L-3.4 -21.4C-3.4 -23.3 -1.9 -24.8 0 -24.8Z"
          fill="#FFFFFF"
        />
      </g>
    </svg>
  );
}

export function BrandLogo({
  size = "md",
  className,
  href = "/",
}: BrandLogoProps) {
  const s = sizeMap[size];

  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center font-extrabold text-[#0b1f3a] no-underline",
        s.gap,
        s.text,
        className
      )}
      aria-label="TurismoGo"
    >
      <BrandMark className={s.mark} />
      <span>
        Turismo <span className="text-[#10a7b5]">Go</span>
      </span>
    </Link>
  );
}
