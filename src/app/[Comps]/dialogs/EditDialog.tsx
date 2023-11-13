"use client"
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import useCurrentUser from "@/hooks/useCurrentUser"
import axios from "axios"
import { ChangeEvent, useCallback, useState } from "react"
import ImageUpload from "../users/ImageUpload"
import { Button } from "@/components/ui/button"
import useUser from "@/hooks/useUser"

const EditDialog = () => {
    const { toast } = useToast()
    const { data: currentUser } = useCurrentUser()
    const { mutate } = useUser(currentUser?.id)
    console.log(currentUser);
    const [credentials, setCredentials] = useState({
        name: currentUser?.name || "",
        username: currentUser?.username || "",
        bio: currentUser?.bio || "",
        profileImage: currentUser?.profileImage || "",
        coverImage: currentUser?.coverImage || ""
    })
    const [loading, setLoading] = useState(false)
    const onSubmit = useCallback(async () => {
        try {
            setLoading(true)
            await axios.patch("/api/edit", credentials)
            mutate()
            toast({
                title: "Updated Successfully"
            })
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Something went wrong"
            })
        } finally {
            setLoading(false)
        }
    }, [credentials, mutate])
    const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }, [credentials])
    return (
        <DialogContent className="bg-neutral-600 flex justify-center flex-col text-white">
            <DialogHeader>
                <DialogTitle className="text-xl font-semibold">Edit</DialogTitle>
            </DialogHeader>
            <div>
                <Input placeholder="Name" name="name" type="text" value={credentials.name} onChange={onChange} />
            </div>
            <div>
                <Input placeholder="Username" name="username" type="text" value={credentials.username} onChange={onChange} />
            </div>
            <div>
                <Input placeholder="Bio" name="bio" type="text" value={credentials.bio} onChange={onChange} />
            </div>
            <div>
                <ImageUpload label="Upload profile image" value={credentials.profileImage} onChange={(image) => setCredentials({ ...credentials, profileImage: image })} key={1} />
            </div>
            <div>
                <ImageUpload label="Upload cover image" value={credentials.coverImage} onChange={(image) => setCredentials({ ...credentials, coverImage: image })} key={2} />
            </div>
            <DialogFooter>
                <Button type="submit" onClick={onSubmit} variant={"outline"}>
                    Edit
                </Button>
            </DialogFooter>
        </DialogContent>
    )
}

export default EditDialog