"use client"
import useCurrentUser from '@/hooks/useCurrentUser'
import { formatDistanceToNowStrict } from 'date-fns'
import { useRouter } from 'next/navigation'
import React, { useCallback, useMemo } from 'react'
import ProfileAvatar from '../ProfileAvatar'
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage } from "react-icons/ai"
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import Login from '../dialogs/Login'
import useLike from '@/hooks/useLike'
import { useToast } from '@/components/ui/use-toast'

interface PostItemProps {
    data: Record<string, any>,
    userId?: string
}

const PostItem: React.FC<PostItemProps> = ({ data, userId }) => {
    const router = useRouter()
    const { toast } = useToast()
    const { hasLiked, toggleLike } = useLike({ postId: data.id, userId: userId as string })
    const { data: currentUser } = useCurrentUser()
    const goToUser = useCallback((e: any) => {
        e.stopPropagation()
        router.push(`/users/${data.user.id}`)
    }, [router, data.user.id])
    const goToPost = useCallback(() => {
        router.push(`/posts/${data.id}`)
    }, [router, data.id])
    const createdAt = useMemo(() => {
        if (!data.createdAt) {
            return null
        }
        return formatDistanceToNowStrict(new Date(data.createdAt))
    }, [data.createdAt])
    const onLike = useCallback((e: any) => {
        e.stopPropagation()
        if (!currentUser) {
            toast({
                title: "Please login to Like",
                variant: "destructive"
            })
        }
        toggleLike()
    }, [toggleLike, currentUser, toast])
    const LikeIcon = hasLiked ? AiFillHeart : AiOutlineHeart
    return (
        <div onClick={goToPost} className='border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition'>
            <div className='flex flex-row items-start gap-3'>
                <ProfileAvatar image={data.user.profileImage} />
                <div>
                    <div className='flex flex-row items-center gap-2'>
                        <p className='font-semibold hover:underline cursor-pointer' onClick={goToUser}>{data.user.name}</p>
                        <span className='text-neutral-600 cursor-pointer hover:underline hidden md:block'>@{data.user.username}</span>
                        <span className='text-sm text-neutral-500'>{createdAt} ago</span>
                    </div>
                    <div>{data.body}</div>
                    <div className='flex flex-row items-center gap-10 mt-3'>
                        <div className='flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-sky-500'>
                            {!currentUser ? (
                                <div onClick={(e) => e.stopPropagation()}>
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <div className='flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-sky-500'>

                                                <AiOutlineMessage size={20} />
                                                <p>{data.comments.length}</p>
                                            </div>
                                        </DialogTrigger>
                                        <Login />
                                    </Dialog>
                                </div>
                            ) :
                                (
                                    <>
                                        <AiOutlineMessage size={20} />
                                        <p>
                                            {data.comments.length}
                                        </p>
                                    </>
                                )
                            }
                        </div>
                        <div className='flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-red-500' onClick={onLike}>
                            <LikeIcon size={20} />
                            <p>
                                {data.likedIds.length}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostItem