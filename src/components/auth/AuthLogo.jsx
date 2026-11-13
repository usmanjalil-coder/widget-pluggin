import Link from "next/link";
import Logo from "@/components/brand/Logo";

export default function AuthLogo({ className = "mb-7" }) {
  return (
    <Link href="/" aria-label="Tellvira home" className={"flex w-fit text-foreground " + className}>
      <Logo size={32} alignIconLeft />
    </Link>
  );
}
