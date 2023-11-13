"use client"
import PostFeed from "@/app/[Comps]/posts/PostFeed"
import UserBio from "@/app/[Comps]/users/UserBio"
import UserHero from "@/app/[Comps]/users/UserHero"
import UserPage from "@/app/[Comps]/users/UserPage"
import { useParams } from "next/navigation"

const page = () => {
    const params = useParams()
    const { userId } = params
    return (
        <>
            <UserPage userId={userId as string} />
            <UserHero userId={userId as string} />
            <UserBio userId={userId as string} />
            <PostFeed userId={userId as string} />
        </>
    )
}

export default page