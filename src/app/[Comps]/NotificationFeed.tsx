"use client"
import useCurrentUser from "@/hooks/useCurrentUser"
import useNotifications from "@/hooks/useNotifications"
import { useEffect } from "react"
import { BsTwitter } from "react-icons/bs"
import { ClipLoader } from "react-spinners"

const NotificationFeed = () => {
    const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser()
    const { data: fetchedNotifications = [], isLoading } = useNotifications(currentUser?.id)

    useEffect(() => {
        mutateCurrentUser()
    }, [mutateCurrentUser])
    if (fetchedNotifications.length === 0) {
        return (
            <div className="text-center text-center-600 text-neutral-500 p-6 text-xl">
                No notifications
            </div>
        )
    }
    return (
        <div>
            {isLoading && <ClipLoader color="white" />}
            {fetchedNotifications.map((notification: Record<string, any>) => {
                return (
                    <div key={notification.id} className="flex flex-row items-center p-6 gap-4 border-b-[1px] border-neutral-800">
                        <BsTwitter color="white" size={32} />
                        <p className="">
                            {notification.body}
                        </p>
                    </div>
                )
            })}
        </div>
    )
}

export default NotificationFeed