"use client"
import { Button } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog'
import { useToast } from '@/components/ui/use-toast'
import useCurrentUser from '@/hooks/useCurrentUser'
import usePosts from '@/hooks/usePosts'
import { DialogTrigger } from '@radix-ui/react-dialog'
import axios from 'axios'
import React, { useCallback, useState } from 'react'
import Login from './dialogs/Login'
import Register from './dialogs/Register'
import ProfileAvatar from './ProfileAvatar'

interface FormProps {
    placeholder: string
    isComment?: boolean
    postId?: string
}

const Form: React.FC<FormProps> = ({ placeholder, isComment, postId }) => {
    const { toast } = useToast()
    const { data: currentUser } = useCurrentUser()
    const { mutate: mutatePosts } = usePosts()
    const [body, setBody] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const onSubmit = useCallback(async () => {
        try {
            setLoading(true)
            const url = isComment ? `/api/comments?postId=${postId}` : "/api/posts"
            await axios.post(url, { body })
            setBody('')
            toast({
                title: "Tweet created successfuly"
            })

            mutatePosts()
        } catch (error) {
            toast({
                title: "Something went wrong",
                variant: "destructive"
            })
        } finally {
            setLoading(false)
        }
    }, [body, isComment, mutatePosts, postId, toast])
    return (
        <div className='border-b-[1px] border-neutral-800 px-5 py-2'>
            {currentUser ? (
                <div className='flex flex-row gap-4'>
                    <div>
                        <ProfileAvatar image={currentUser.profileImage} />
                    </div>
                    <div className='w-full'>
                        <textarea placeholder={placeholder} disabled={loading} onChange={(e) => setBody(e.target.value)} className='disabled:opacity-80 peer resize-none mt-3 w-full bg-[#191919] ring-0 outline-none text-[18px] placeholder-neutral-400'></textarea>
                        <hr className='opacity-0 peer-focus:opacity-100 h-[1px] border-neutral-800 w-full transition' />
                        <div className='flex flex-row justify-end mt-4'>
                            <Button variant={"test"} className='rounded-2xl' disabled={loading} onClick={onSubmit}>Tweet</Button>
                        </div>
                    </div>
                </div>
            ) : (

                <div className='py-8'>
                    <h1 className='text-2xl text-center mb-4 font-bold'>Welcome to twitter</h1>
                    <div className='flex flex-row items-center justify-center gap-4'>
                        <Dialog >
                            <DialogTrigger asChild>
                                <Button variant={"test"} className='rounded-2xl'>Login</Button>
                            </DialogTrigger>
                            <Login />
                        </Dialog>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant={"secondary"} className='rounded-2xl'>Register</Button>
                            </DialogTrigger>
                            <Register />
                        </Dialog>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Form