"use client";
import fetcher from "@/utils/fetcher";
import useSWR from "swr";

function useUser(userId: string) {
  const { data, isLoading, mutate } = useSWR(
    userId ? `/api/users/${userId}` : null,
    fetcher
  );
  return { data, isLoading, mutate };
}

export default useUser;
