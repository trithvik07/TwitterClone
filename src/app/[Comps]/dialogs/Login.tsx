"use client"
import { Button } from "@/components/ui/button"
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { ChangeEvent, useCallback, useState } from "react"
const Login = () => {
    const router = useRouter()
    const { toast } = useToast()
    const [loading, setLoading] = useState<boolean>(false)
    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    })
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    const handleLogin = useCallback(() => {
        try {
            setLoading(true)
            signIn("credentials", {
                email: credentials.email,
                password: credentials.password
            })
            router.push("/")
            toast({
                title: "Login Successful"
            })
        } catch (error) {
            console.log(error)
            toast({
                title: "Something went wrong",
                variant: "destructive"
            })
        } finally {
            setLoading(false)
        }
    }, [credentials, router])
    return (
        <>

            <DialogContent className="bg-neutral-700 text-white">
                <DialogHeader >
                    <DialogTitle >Login</DialogTitle>
                    <DialogDescription>Please enter your details</DialogDescription>
                </DialogHeader>
                <div >
                    <Input type="email" placeholder="Email" onChange={handleChange} name="email" />
                </div>
                <div>
                    <Input type="password" placeholder="Password" onChange={handleChange} name="password" />
                </div>
                <DialogFooter className="justify-center">
                    <Button type="submit" className="w-fit" onClick={handleLogin} disabled={loading}>Submit</Button>

                </DialogFooter>
                <p className="text-xs text-center text-slate-400">Don't have an account? Please register</p>
            </DialogContent>
            {/* </Dialog> */}
        </>
    )
}

export default Login