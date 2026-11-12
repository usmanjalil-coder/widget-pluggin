"use client";

import { useCallback } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAccount } from "@/lib/api/account.api";

const ACCOUNT_QUERY_KEY = ["account", "profile"];

export default function useAccount() {
  const client = useQueryClient();
  const query = useQuery({
    queryKey: ACCOUNT_QUERY_KEY,
    queryFn: getAccount,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: false,
  });
  const setData = useCallback(async (data) => {
    await client.cancelQueries({ queryKey: ACCOUNT_QUERY_KEY });
    client.setQueryData(ACCOUNT_QUERY_KEY, data);
  }, [client]);
  return {
    data: query.data,
    loading: query.isPending,
    error: query.error?.message || "",
    reload: query.refetch,
    setData,
  };
}
