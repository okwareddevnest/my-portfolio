interface LogoProps {
  className?: string;
  showWordmark?: boolean;
}

// The okwaretech mark: an "o" ring broken open by the chevron of a "k".
// Stroke geometry is shared with public/favicon.svg; change both together.
export const LogoMark = ({ className = "h-7 w-7" }: { className?: string }) => (
  <svg viewBox="0 0 32 32" className={`shrink-0 ${className}`} aria-hidden="true">
    <rect width="32" height="32" rx="7" className="fill-primary" />
    <g fill="none" stroke="#FFFFFF" strokeWidth="3.4">
      <path d="M22.5 10.2A9 9 0 1 0 22.5 21.8" />
      <path d="M27 8.5L18.6 16L27 23.5" />
    </g>
  </svg>
);

export const Logo = ({ className = "", showWordmark = true }: LogoProps) => (
  <span className={`inline-flex items-center gap-2.5 text-text ${className}`}>
    <LogoMark />
    {showWordmark && (
      <span className="text-[17px] font-semibold tracking-[-0.02em]">okwaretech</span>
    )}
  </span>
);

export default Logo;
