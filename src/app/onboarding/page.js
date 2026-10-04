import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import OnboardingFlow from "@/components/onboarding/OnboardingFlow";

export const metadata = {
  title: "Onboarding",
  description:
    "Set up your website assistant with onboarding steps for your business and appearance.",
};

export default async function OnboardingPage() {
  const cookieStore = await cookies();

  if (!cookieStore.get("mock_session")) {
    redirect("/login");
  }

  return <OnboardingFlow />;
}
