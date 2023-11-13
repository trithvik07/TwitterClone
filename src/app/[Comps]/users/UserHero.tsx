import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import useUser from "@/hooks/useUser"
import { User } from "@prisma/client"
import Image from "next/image"

const UserHero = ({ userId }: { userId: string }) => {
    const { data: user } = useUser(userId)
    return (
        <div className="bg-neutral-700 h-44 relative mt-5">
            {user?.coverImage && <Image src={user.coverImage} fill alt="cover image" style={{ objectFit: "cover" }} />}
            <div className="absolute -bottom-16 left-4">
                <Avatar className="w-32 h-32 ">
                    {user?.profileImage && <AvatarImage src={user.profileImage} />}
                    <AvatarFallback >DP</AvatarFallback>
                </Avatar>
            </div>

        </div>
    )
}

export default UserHero