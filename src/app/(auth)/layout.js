export const metadata = { robots: { index: false, follow: false } };

export default function AuthLayout({ children }) {
  return <DesignProviders>{children}</DesignProviders>;
}
import DesignProviders from "@/components/DesignProviders";

