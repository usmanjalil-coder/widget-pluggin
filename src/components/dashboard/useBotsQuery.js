"use client";

import { useCallback } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBots } from "@/lib/api/bots.api";
import { BOTS_QUERY_KEY } from "@/lib/query-client";

export default function useBotsQuery() {
  const client = useQueryClient();
  const query = useQuery({
    queryKey: BOTS_QUERY_KEY,
    queryFn: () => getBots(),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: false,
  });
  const setData = useCallback((update) => client.setQueryData(BOTS_QUERY_KEY, update), [client]);
  return {
    data: query.data,
    loading: query.isPending,
    error: query.error?.message || "",
    reload: query.refetch,
    setData,
  };
}
