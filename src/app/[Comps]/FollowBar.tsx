"use client"
import { User } from "@prisma/client"
import ProfileAvatar from "./ProfileAvatar"
import { useRouter } from "next/navigation"
import { Skeleton } from "@/components/ui/skeleton"
import useUsers from "@/hooks/useUsers"
const FollowBar = () => {
    const router = useRouter()
    const { data: users, isLoading } = useUsers()
    return (
        <div className="lg:block hidden px-6">
            <div className="bg-neutral-800 rounded-xl p-4">
                <h2 className="text-xl mb-3">Who to follow</h2>
                {!isLoading ? users.map((user: User) => {
                    return (
                        <div key={user?.id} className="mt-2 flex items-center hover:cursor-pointer" onClick={() => {
                            router.push(`/users/${user?.id}`)
                        }}>
                            <ProfileAvatar image={user?.profileImage} />
                            <div className="ml-3">
                                <p>{user.name}</p>
                                <p className="text-xs text-slate-300">@{user?.username}</p>
                            </div>
                        </div>
                    )
                }) : (
                    <div className="flex items-center space-x-4">
                        <Skeleton className="h-12 w-12 rounded-full" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-[150px]" />
                            <Skeleton className="h-4 w-[100px]" />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default FollowBar