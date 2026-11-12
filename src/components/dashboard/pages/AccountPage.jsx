"use client";

import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import AccountSettingsPanel from "../AccountSettingsPanel";
import useAccount from "../useAccount";
import { updateAccount, updatePassword } from "@/lib/api/account.api";
import { getBillingOverview } from "@/lib/api/billing.api";

export default function AccountPage() {
  const { data: account, loading, error, reload, setData } = useAccount();
  const billing = useQuery({
    queryKey: ["billing", "overview"],
    queryFn: ({ signal }) => getBillingOverview(signal),
    staleTime: 30_000,
    retry: false,
  });
  const onSave = useCallback(
    async (payload) => {
      const saved = await updateAccount(payload);
      await setData(saved);
      return saved;
    },
    [setData],
  );
  return (
    <AccountSettingsPanel
      account={account}
      planName={billing.data?.currentPlan?.name}
      planLoading={billing.isPending}
      loading={loading}
      error={error}
      onRetry={reload}
      onSave={onSave}
      onPassword={updatePassword}
    />
  );
}
