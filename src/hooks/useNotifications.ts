import fetcher from "@/utils/fetcher";
import useSWR from "swr";

const useNotifications = (userId: string) => {
  if (!userId) {
    return {
      data: [],
    };
  }
  const url = `/api/notification/${userId}`;
  const { data, error, isLoading, mutate } = useSWR(url, fetcher);
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useNotifications;
