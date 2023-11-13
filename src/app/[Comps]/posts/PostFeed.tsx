"use client"
import usePosts from '@/hooks/usePosts'
import React from 'react'
import PostItem from './PostItem'
import { ClipLoader } from 'react-spinners'
interface PostFeedProps {
    userId?: string
}
const PostFeed: React.FC<PostFeedProps> = ({ userId }) => {
    const { data: posts = [], isLoading } = usePosts(userId)
    return (
        <div>
            {!isLoading ? posts.map((post: Record<string, any>) => {
                return <PostItem data={post} key={post.id} userId={userId} />
            }) : (
                <div className='flex justify-center mt-5'>
                    <ClipLoader color='white' />
                </div>
            )}
        </div>
    )
}

export default PostFeed