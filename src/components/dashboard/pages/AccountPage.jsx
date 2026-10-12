"use client";

import { useCallback } from "react";
import AccountSettingsPanel from "../AccountSettingsPanel";
import { useDashboard } from "../dashboard-context";
import { updateAccount, updatePassword } from "@/lib/api/account.api";
export default function AccountPage() {
  const { account, accountLoading, accountError, loadAccount, setAccount } = useDashboard();
  const onSave = useCallback(
    async (payload) => {
      const saved = await updateAccount(payload);
      setAccount(saved);
      return saved;
    },
    [setAccount],
  );
  return (
    <AccountSettingsPanel
      account={account}
      loading={accountLoading}
      error={accountError}
      onRetry={loadAccount}
      onSave={onSave}
      onPassword={updatePassword}
    />
  );
}
