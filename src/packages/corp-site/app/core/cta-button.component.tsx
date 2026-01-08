"use client";

import Link from "next/link";

interface CTAButtonProps {
  title: string;
  description?: string;
  href?: string;
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export default function CTAButton({
  title,
  description,
  href,
  prefixIcon,
  suffixIcon,
  onClick,
  className = "",
}: CTAButtonProps) {
  const baseClasses =
    "flex items-start gap-3 p-4 bg-primary hover:bg-primary-focus transition-colors rounded-lg border border-base-300 text-left";
  const combinedClasses = `${baseClasses} ${className}`;

  const content = (
    <>
      {prefixIcon && (
        <div className="flex-shrink-0 text-base-content/70">{prefixIcon}</div>
      )}
      <div className="flex-1">
        <h3 className="font-semibold text-base-content mb-1">{title}</h3>
        {description && (
          <p className="text-sm text-base-content/70">{description}</p>
        )}
      </div>
      {suffixIcon && (
        <div className="flex-shrink-0 text-base-content/70">{suffixIcon}</div>
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={combinedClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={combinedClasses}>
      {content}
    </button>
  );
}
