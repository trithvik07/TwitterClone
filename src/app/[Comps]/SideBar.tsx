"use client"
import React from 'react'
import { BsTwitter } from 'react-icons/bs'
import SideBarTweet from './SideBarTweet'
import useCurrentUser from '@/hooks/useCurrentUser'
import LogOut from './LogOut'
import SideBarItem from './SideBarItem'



const SideBar = () => {
    const { data: user } = useCurrentUser()
    return (
        <>
            <div className='ml-3 mt-1'>
                <BsTwitter size={36} />
                <SideBarItem user={user} />
                {user && <LogOut />}
                <SideBarTweet />
            </div>
        </>

    )
}

export default SideBar