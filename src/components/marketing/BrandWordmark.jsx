import Logo from "@/components/brand/Logo";

export function BrandWordmark({ className = "", size = "header" }) {
  return (
    <span className={`inline-flex h-[60px] w-[253px] shrink-0 items-center ${className}`}>
      <Logo size={40} />
    </span>
  );
}
