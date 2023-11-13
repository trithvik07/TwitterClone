"use client";
import { useToast } from "@/components/ui/use-toast";
import useCurrentUser from "./useCurrentUser";
import usePost from "./usePost";
import usePosts from "./usePosts";
import { useCallback, useMemo } from "react";
import axios from "axios";

const useLike = ({ userId, postId }: { userId: string; postId: string }) => {
  const { data: currentUser } = useCurrentUser();
  const { mutate: mutateFetchedPosts } = usePosts();
  const { data: fetchedPost, mutate: mutatePost } = usePost(postId);
  const { toast } = useToast();
  const hasLiked = useMemo(() => {
    return fetchedPost?.likedIds.includes(currentUser?.id);
  }, [fetchedPost?.likedIds, currentUser?.id]);
  const toggleLike = useCallback(async () => {
    if (!currentUser) {
      toast({
        title: "Please Login",
        variant: "destructive",
      });
    }
    try {
      let request;
      if (hasLiked) {
        request = () => axios.delete("/api/like", { data: { postId } });
      } else {
        request = () => axios.post("/api/like", { postId });
      }
      await request();
      mutatePost();
      mutateFetchedPosts();
      toast({
        title: "Tweet liked successfully",
      });
    } catch (error) {
      toast({
        title: "Something went wrong",
        variant: "destructive",
      });
    }
  }, [currentUser, hasLiked, postId, mutateFetchedPosts, mutatePost, toast]);
  return { hasLiked, toggleLike };
};

export default useLike;
