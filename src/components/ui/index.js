export function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}) {
  const styles =
    variant === "primary"
      ? "bg-blue-600 text-white hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
      : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 focus-visible:ring-offset-2";

  return (
    <button
      className={`inline-flex items-center justify-center rounded-xl px-3.5 py-2.5 text-sm font-semibold shadow-sm transition ${styles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function Input({ className = "", ...props }) {
  return (
    <input
      className={`w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 ${className}`}
      {...props}
    />
  );
}

export function Textarea({ className = "", ...props }) {
  return (
    <textarea
      className={`w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 ${className}`}
      {...props}
    />
  );
}

export function Select({ className = "", children, ...props }) {
  return (
    <select
      className={`w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 ${className}`}
      {...props}
    >
      {children}
    </select>
  );
}

export function Card({ title, subtitle, children, className = "" }) {
  return (
    <section
      className={`rounded-2xl border border-slate-200 bg-white p-5 shadow-sm ${className}`}
    >
      {(title || subtitle) && (
        <div className="mb-4">
          {title && (
            <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
          )}
          {subtitle && (
            <p className="mt-1 text-xs text-slate-500">{subtitle}</p>
          )}
        </div>
      )}
      {children}
    </section>
  );
}

export function Badge({ children, tone = "default", className = "" }) {
  const tones = {
    default: "bg-slate-100 text-slate-700",
    success: "bg-emerald-100 text-emerald-700",
    warning: "bg-amber-100 text-amber-700",
    danger: "bg-rose-100 text-rose-700",
    info: "bg-blue-100 text-blue-700",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-1 text-[11px] font-medium ${tones[tone] || tones.default} ${className}`}
    >
      {children}
    </span>
  );
}

export function Switch({ checked, onChange, label }) {
  return (
    <label className="flex items-center justify-between gap-3">
      <span className="text-sm text-slate-700">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange && onChange(!checked)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${checked ? "bg-blue-600" : "bg-slate-200"}`}
      >
        <span
          className={`inline-block h-4 w-4 rounded-full bg-white transition ${checked ? "translate-x-6" : "translate-x-1"}`}
        />
      </button>
    </label>
  );
}

export function EmptyState({ title, body, action }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center">
      <h3 className="text-base font-semibold text-slate-800">{title}</h3>
      {body && <p className="mt-2 text-sm text-slate-500">{body}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

export function Skeleton({ className = "h-4 w-28 rounded" }) {
  return <div className={`animate-pulse rounded bg-slate-200 ${className}`} />;
}
