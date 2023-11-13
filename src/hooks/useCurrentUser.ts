"use client";
import fetcher from "@/utils/fetcher";
import useSWR from "swr";
const useCurrentUser = () => {
  const { data, isLoading, mutate } = useSWR("/api/current", fetcher);

  return { data, isLoading, mutate };
};
export default useCurrentUser;
