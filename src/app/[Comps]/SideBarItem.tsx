"use client"
import { Item } from "@/utils/types"
import React, { useCallback } from "react"
import { BsBell, BsDot, BsHouseFill, BsPersonFill, } from "react-icons/bs"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
const SideBarItem = ({ user }: { user: any }) => {
    const { toast } = useToast()
    const router = useRouter()
    const items: Item[] = [{
        label: "Home",
        icon: BsHouseFill,
        navigate: "/",
        auth: false
    },
    {
        label: "Notifications",
        icon: BsBell,
        navigate: "/notifications",
        auth: true,
        alert: user?.hasNotification
    },
    {
        label: "Profile",
        icon: BsPersonFill,
        navigate: `/users/${user?.id}`,
        auth: true
    }]
    console.log(user);

    const handleClick = useCallback((navigate: string, auth: boolean) => {
        if (!user && auth)
            toast({
                title: "Please login to access those sections",
                variant: "destructive"
            })
        else
            router.push(navigate)
    }, [user, router])
    return (
        <>
            {items.map((item) => {
                return (
                    <div key={item.navigate}>

                        <div className=" hidden lg:block relative" onClick={() => handleClick(item.navigate, item.auth!)}>
                            <div className="flex flex-row mt-5">

                                <item.icon size={24} />
                                {item.alert ? <BsDot size={65} className="text-sky-500 absolute -top-7 -left-3" /> : null}
                                <p className="font-bold pl-3 cursor-pointer">
                                    {item.label}
                                </p>
                            </div>
                        </div>
                        <div className="lg:hidden flex mt-5 relative" onClick={() => handleClick(item.navigate, item.auth!)}>
                            <item.icon size={24} />
                            {item.alert ? <BsDot size={65} className="text-sky-500 absolute -top-7 -left-3" /> : null}
                        </div>
                    </div>
                )
            })}

        </>
    )
}

export default SideBarItem