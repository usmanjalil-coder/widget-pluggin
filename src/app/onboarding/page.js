import AuthenticatedRoute from "@/components/auth/AuthenticatedRoute";
import OnboardingFlow from "@/components/onboarding/OnboardingFlow";

export const metadata = {
  title: "Onboarding",
  description: "Set up your website assistant.",
};

export default function OnboardingPage() {
  return (
    <AuthenticatedRoute>
      <OnboardingFlow />
    </AuthenticatedRoute>
  );
}
