"use client"
import { format } from "date-fns"
import { useMemo } from "react"
import useUser from "@/hooks/useUser"
import { Button } from "@/components/ui/button"
import useCurrentUser from "@/hooks/useCurrentUser"
import { BiCalendar } from "react-icons/bi"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import EditDialog from "../dialogs/EditDialog"
import useFollow from "@/hooks/useFollow"

const UserBio = ({ userId }: { userId: string }) => {

    const { data: user } = useUser(userId)

    const { data: currentUser } = useCurrentUser()
    const { isFollowing, toggleFollow } = useFollow(userId)
    const createdAt = useMemo(() => {
        if (!user?.createdAt) {
            return null
        }
        return format(new Date(user.createdAt), "MMMM yyyy")
    }, [user?.createdAt])
    return (
        <div className="border-b-[1px] border-neutral-800 pb-4">
            <div className="flex justify-end p-3">
                {userId === currentUser?.id ? (
                    <Dialog >
                        <DialogTrigger asChild>
                            <Button variant={"outline"}>Edit</Button>
                        </DialogTrigger>
                        <EditDialog />
                    </Dialog>
                ) : <Button variant={"outline"} onClick={toggleFollow}>{isFollowing ? "Unfollow" : "Follow"}</Button>}
            </div>
            <div className="mt-4 ml-4">
                <p className="text-xl">{user?.name}</p>
                <p className="text-md text-neutral-500">@{user?.username}</p>
            </div>
            <div className="ml-4">
                <p>{user?.bio}</p>
            </div>
            <div className="ml-4 mt-3">
                <div className="flex flex-row gap-2 items-center">
                    <BiCalendar />
                    <p className="text-md text-neutral-500">Joined on {createdAt}</p>
                </div>
                <div className="flex flex-row mt-3 gap-3 text-neutral-500">
                    <p><span className="text-white" >{user?.followingIds.length}</span> following</p>
                    <p><span className="text-white">{user?.followerCount || 0}</span> followers</p>
                </div>
            </div>
        </div>
    )
}

export default UserBio