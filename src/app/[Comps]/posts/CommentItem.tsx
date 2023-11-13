"use client"
import { formatDistanceToNowStrict } from "date-fns"
import { useRouter } from "next/navigation"
import React, { useCallback, useMemo } from "react"
import ProfileAvatar from "../ProfileAvatar"

interface CommentItemProps {
    data?: Record<string, any>
}
const CommentItem: React.FC<CommentItemProps> = ({ data }) => {
    const router = useRouter()
    const goToUser = useCallback(async (e: any) => {
        e.stopPropagation()
        router.push(`/users/${data?.user.id}`)
    }, [router, data?.user.id])
    const createdAt = useMemo(() => {
        if (!data?.createdAt) {
            return null
        }

        return formatDistanceToNowStrict(new Date(data?.createdAt))
    }, [data?.createdAt])
    return (
        <div className="border-b-[1px] border-neutral-500 p-5 cursor-pointer hover:bg-neutral-900 transition">
            <div className="flex flex-row items-start gap-3">
                <ProfileAvatar image={data?.user.profileImage} />
                <div>

                    <div className="flex flex-row items-center gap-2">
                        <p className="text-white font-semibold cursor-pointer hover:underline" onClick={goToUser}>{data?.user.name}</p>
                        <span className="text-sm text-neutral-500 cursor-pointer hover:underline hidden md:block">@{data?.user.username}</span>
                        <span className="text-sm text-neutral-400">{createdAt} ago</span>
                    </div>
                    <div className="mt-1">{data?.body}</div>
                </div>
            </div>
        </div>
    )
}

export default CommentItem