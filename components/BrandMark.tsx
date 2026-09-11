"use client";

import { Wrench } from "@phosphor-icons/react";

export default function BrandMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-flex shrink-0 items-center justify-center rounded-[11px] bg-brand-500 text-white shadow-sm ${className}`}
    >
      <Wrench weight="bold" className="h-[58%] w-[58%]" />
    </span>
  );
}
