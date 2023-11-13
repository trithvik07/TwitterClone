"use client"
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { BiLogOut } from "react-icons/bi"

const LogOut = () => {
    const router = useRouter()
    const handleLogout = () => {
        signOut()
        router.push("/")
    }
    return (
        <>
            <div className=" hidden lg:block" onClick={handleLogout}>
                <div className="flex flex-row mt-5">

                    <BiLogOut size={24} />
                    <p className="font-bold pl-3 cursor-pointer">
                        Logout
                    </p>
                </div>
            </div>
            <div className="lg:hidden flex mt-5">
                <BiLogOut size={24} />
            </div>
        </>
    )
}

export default LogOut