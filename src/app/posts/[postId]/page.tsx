"use client"
import React from 'react'
import { ClipLoader } from "react-spinners"
import usePost from '@/hooks/usePost'
import PostItem from '@/app/[Comps]/posts/PostItem'
import Header from '@/app/[Comps]/Header'
import Form from '@/app/[Comps]/Form'
import CommentFeed from '@/app/[Comps]/posts/CommentFeed'
const page = ({ params }: { params: { postId: string } }) => {
    const { data: post, isLoading } = usePost(params.postId)
    return (
        <div>
            {isLoading ? (
                <div className='flex justify-center'>
                    <ClipLoader color='lightblue' />
                </div>
            ) : (
                <>
                    <Header label='Tweet' showBackArrow />
                    <PostItem data={post} />
                    <Form postId={params.postId} isComment placeholder='Tweet your reply' />
                    <CommentFeed comments={post?.comments} />
                </>
            )}
        </div>
    )
}

export default page