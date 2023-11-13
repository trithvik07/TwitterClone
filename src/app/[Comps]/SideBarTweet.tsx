"use client"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { useRouter } from "next/navigation"
import { FaFeather } from "react-icons/fa"
import Login from "./dialogs/Login"
import { Button } from "@/components/ui/button"
const SideBarTweet = () => {
    const router = useRouter()
    return (
        <>
            <div className="lg:hidden flex justify-center items-center h-12 w-12 p-2 mt-3 bg-sky-500 transition hover:bg-opacity-80 rounded-full" onClick={() => router.push("/")}>
                <FaFeather size={24} />
            </div>
            <div className="hidden lg:flex ">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className=" bg-sky-500 mt-5 px-6 py-2 rounded-md" variant={"test"}>Tweet</Button>
                    </DialogTrigger>
                    <Login />
                </Dialog>
            </div>
        </>
    )
}

export default SideBarTweet