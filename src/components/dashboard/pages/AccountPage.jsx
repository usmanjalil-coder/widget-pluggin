"use client";

import { useCallback } from "react";
import AccountSettingsPanel from "../AccountSettingsPanel";
import useDashboardResource from "../useDashboardResource";
import { getAccount, updateAccount, updatePassword } from "@/lib/api/account.api";

export default function AccountPage() {
  const { data: account, loading, error, reload, setData } = useDashboardResource(getAccount);
  const onSave = useCallback(
    async (payload) => {
      const saved = await updateAccount(payload);
      setData(saved);
      return saved;
    },
    [setData],
  );
  return (
    <AccountSettingsPanel
      account={account}
      loading={loading}
      error={error}
      onRetry={reload}
      onSave={onSave}
      onPassword={updatePassword}
    />
  );
}
