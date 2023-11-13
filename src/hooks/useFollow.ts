import { useCallback, useMemo } from "react";
import useCurrentUser from "./useCurrentUser";
import useUser from "./useUser";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";

const useFollow = (userId: string) => {
  const { toast } = useToast();
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { mutate: mutateUser } = useUser(userId);
  const isFollowing = useMemo(() => {
    const list = currentUser?.followingIds || [];
    return list.includes(userId);
  }, [userId, currentUser?.followingIds]);
  const toggleFollow = useCallback(async () => {
    try {
      let request;
      if (isFollowing) {
        request = () => axios.delete("/api/follow", { data: { userId } });
      } else {
        request = () => axios.post("/api/follow", { userId });
      }

      await request();
      mutateCurrentUser();
      mutateUser();
      toast({
        description: "Success",
      });
    } catch (error) {
      toast({
        description: "An error occured",
        variant: "destructive",
      });
    }
  }, [currentUser, isFollowing, userId, mutateCurrentUser, mutateUser]);
  return {
    isFollowing,
    toggleFollow,
  };
};

export default useFollow;
