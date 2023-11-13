"use client"
import { BiArrowBack } from "react-icons/bi"
import { Skeleton } from "@/components/ui/skeleton"
import { User } from "@prisma/client"
import { useRouter } from "next/navigation"
import useUser from "@/hooks/useUser"

const UserPage = ({ userId }: { userId: string }) => {
    const { data: user, isLoading } = useUser(userId)
    const router = useRouter()
    return (
        <div className="flex gap-3 h-fit items-center justify-start">
            <BiArrowBack onClick={() => router.push("/")} className="cursor-pointer hover:opacity-70 transition" />
            {!isLoading ? <div className="">

                <p className="text-xl font-semibold">{user?.name}</p>
            </div> : <Skeleton className="w-[100px] h-5" />}
        </div>
    )
}

export default UserPage