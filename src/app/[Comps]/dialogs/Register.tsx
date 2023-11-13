"use client"
import { Button } from "@/components/ui/button"
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import axios from 'axios'
import { Input } from "@/components/ui/input"
import { ChangeEvent, useCallback, useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { signIn } from "next-auth/react"
const Register = () => {
    const { toast } = useToast()
    const [credentials, setCredentials] = useState({
        email: "",
        name: "",
        username: "",
        password: ""
    })
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    const handleSubmit = useCallback(async () => {
        try {
            setIsLoading(true)
            await axios.post("/api/register", credentials)
            toast({
                title: "Registered Successfully"
            })
            signIn("credentials", {
                email: credentials.email,
                password: credentials.password
            })
        } catch (error) {
            console.log(error)
            toast({
                title: "Something went wrong"
            })
        } finally {
            setIsLoading(false)
        }

    }, [credentials, toast])
    return (
        <>
            <DialogContent className="bg-neutral-700 text-white">
                <DialogHeader >
                    <DialogTitle >Register</DialogTitle>
                    <DialogDescription>Welcome to Twitter</DialogDescription>
                </DialogHeader>
                <div >
                    <Input type="email" placeholder="Email" name="email" onChange={handleChange} />
                </div>
                <div >
                    <Input type="text" placeholder="Name" name="name" onChange={handleChange} />
                </div>
                <div >
                    <Input type="text" placeholder="Username" name="username" onChange={handleChange} />
                </div>
                <div>
                    <Input type="password" placeholder="Password" name="password" onChange={handleChange} />
                </div>
                <DialogFooter className="justify-center">
                    <Button type="submit" className="w-fit" onClick={handleSubmit} disabled={isLoading}>Submit</Button>
                </DialogFooter>
                <p className="text-xs text-center text-slate-400">Already have an account? Please Login</p>
            </DialogContent>
            {/* </Dialog> */}
        </>
    )
}

export default Register