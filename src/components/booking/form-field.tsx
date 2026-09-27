import type { ReactNode } from "react";

export function FormField({ name, label, error, children, className = "" }: { name: string; label: string; error?: string; children: ReactNode; className?: string }) {
  return <div className={`form-field ${className}`}>
    <label htmlFor={`booking-${name}`}>{label}</label>
    {children}
    {error && <p id={`error-${name}`} className="field-error" role="alert">{error}</p>}
  </div>;
}
