import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import Login from "./Login"
import React from "react"
const LoginDialog = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"test"}>Login</Button>
            </DialogTrigger>
            <Login />
        </Dialog>
    )
}

export default LoginDialog