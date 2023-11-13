import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import React from 'react'
import Register from './Register'

const RegisterDialog = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"test"}>Register</Button>
            </DialogTrigger>
            <Register />
        </Dialog>
    )
}

export default RegisterDialog