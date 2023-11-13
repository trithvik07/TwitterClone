import React from 'react'
import CommentItem from './CommentItem'
interface CommentFeedProps {
  comments?: Record<string, any>[]
}
const CommentFeed: React.FC<CommentFeedProps> = ({ comments }) => {
  return (
    <div>{comments?.map((comment) => {
      return <CommentItem data={comment} key={comment?.id} />
    })}</div>
  )
}

export default CommentFeed