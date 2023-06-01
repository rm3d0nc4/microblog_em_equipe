import Comment from "./comment"

export default interface CommentableBLogRepository {
    createComment(postId: string, comment: Comment) : Promise<Comment>
    retrieveCommnent(postId: string, commentId: string): Promise<Comment>
    retrieveAllComments(): Promise<Comment[]>
    retrieveAllCommentsByPost(postId: string): Promise<Comment[]>
    updateComment(postId: string, comment: Comment): Promise<void>
    deleteComment(postId: string, commentId: string): Promise<void>
}