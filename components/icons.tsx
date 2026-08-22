// Единый набор line-иконок в стиле Lucide (24×24, stroke-based).
// Все иконки декоративные — aria-hidden, смысл несёт текст рядом.

type IconProps = { className?: string };

const base = "h-6 w-6";

function Svg({
  className,
  children,
}: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className ?? base}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export function StarIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className ?? base}
      aria-hidden="true"
    >
      <path d="m12 2.5 2.9 5.9 6.5.95-4.7 4.58 1.11 6.47L12 17.35l-5.81 3.05 1.11-6.47L2.6 9.35l6.5-.95z" />
    </svg>
  );
}

export function StarHalfIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className ?? base} aria-hidden="true">
      <defs>
        <linearGradient id="half-star">
          <stop offset="50%" stopColor="currentColor" />
          <stop offset="50%" stopColor="currentColor" stopOpacity="0.25" />
        </linearGradient>
      </defs>
      <path
        fill="url(#half-star)"
        d="m12 2.5 2.9 5.9 6.5.95-4.7 4.58 1.11 6.47L12 17.35l-5.81 3.05 1.11-6.47L2.6 9.35l6.5-.95z"
      />
    </svg>
  );
}

export function PhoneIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
    </Svg>
  );
}

export function ClockIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <circle cx="12" cy="12" r="9.25" />
      <path d="M12 7v5.2l3.2 1.9" />
    </Svg>
  );
}

export function MapPinIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M20 10.5c0 5.5-8 12-8 12s-8-6.5-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10.5" r="2.9" />
    </Svg>
  );
}

export function ShieldCheckIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M12 22s8-3.6 8-9.6V5.4L12 2.3 4 5.4v7c0 6 8 9.6 8 9.6Z" />
      <path d="m9 12 2.2 2.2L15.4 10" />
    </Svg>
  );
}

export function BoltIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M13.5 2 4 13.4h6.6L10 22l9.5-11.4h-6.6z" />
    </Svg>
  );
}

export function WalletIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M3 7.5A2.5 2.5 0 0 1 5.5 5H18a2 2 0 0 1 2 2v1" />
      <path d="M3 7.5V17a2.5 2.5 0 0 0 2.5 2.5H19a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2H5.5A2.5 2.5 0 0 1 3 7.5Z" />
      <circle cx="16.5" cy="13.8" r="1.15" fill="currentColor" stroke="none" />
    </Svg>
  );
}

export function ToolboxIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M3 9.5h18v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <path d="M9 9.5V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v3.5" />
      <path d="M3 14h18" />
    </Svg>
  );
}

export function TelegramIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className ?? base}
      aria-hidden="true"
    >
      <path d="M21.6 4.3 18.5 19c-.23 1.03-.85 1.29-1.72.8l-4.75-3.5-2.29 2.2c-.25.26-.47.47-.96.47l.34-4.85 8.83-7.98c.38-.34-.09-.53-.6-.19L6.44 12.8l-4.7-1.47c-1.02-.32-1.04-1.02.21-1.51l18.38-7.08c.85-.31 1.6.2 1.32 1.56z" />
    </svg>
  );
}

export function WhatsAppIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className ?? base}
      aria-hidden="true"
    >
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m0 1.67c2.2 0 4.27.86 5.82 2.42a8.19 8.19 0 0 1 2.42 5.82c0 4.54-3.7 8.24-8.25 8.24a8.23 8.23 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24m-3.6 4.1c-.17 0-.44.06-.68.31-.23.25-.89.87-.89 2.12s.92 2.46 1.04 2.63c.13.16 1.78 2.72 4.32 3.81.6.26 1.07.42 1.44.53.6.2 1.15.17 1.59.1.48-.07 1.5-.61 1.71-1.2.21-.6.21-1.1.15-1.21-.06-.1-.23-.17-.48-.29-.25-.13-1.5-.74-1.73-.82-.23-.09-.4-.13-.57.12-.16.25-.65.82-.8.99-.14.16-.29.19-.54.06-.25-.12-1.07-.39-2.04-1.25-.75-.67-1.26-1.5-1.41-1.75-.15-.25-.02-.38.11-.51.11-.11.25-.29.37-.44.13-.14.17-.25.25-.41.09-.17.04-.31-.02-.44-.06-.12-.56-1.37-.77-1.87-.2-.49-.4-.42-.55-.43z" />
    </svg>
  );
}

export function ArrowRightIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </Svg>
  );
}

export function CheckIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </Svg>
  );
}

export function ChevronLeftIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="m14.5 5-7 7 7 7" />
    </Svg>
  );
}

export function ChevronRightIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="m9.5 5 7 7-7 7" />
    </Svg>
  );
}

export function QuoteIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className ?? base}
      aria-hidden="true"
    >
      <path d="M9.4 5.5c-3.2 1.5-5.4 4.5-5.4 8.2 0 3 1.8 4.8 4 4.8 2 0 3.6-1.5 3.6-3.5s-1.4-3.4-3.2-3.4h-.5c.3-1.6 1.6-3.2 3.3-4.1zm9.6 0c-3.2 1.5-5.4 4.5-5.4 8.2 0 3 1.8 4.8 4 4.8 2 0 3.6-1.5 3.6-3.5s-1.4-3.4-3.2-3.4h-.5c.3-1.6 1.6-3.2 3.3-4.1z" />
    </svg>
  );
}

export function MapIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M9 3 3 5.6v15L9 18l6 3 6-2.6v-15L15 6z" />
      <path d="M9 3v15M15 6v15" />
    </Svg>
  );
}
