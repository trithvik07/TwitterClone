"use client";
import fetcher from "@/utils/fetcher";
import useSWR from "swr";
const useUsers = () => {
  const { data, isLoading } = useSWR("/api/users", fetcher);
  return {
    data,
    isLoading,
  };
};
export default useUsers;
