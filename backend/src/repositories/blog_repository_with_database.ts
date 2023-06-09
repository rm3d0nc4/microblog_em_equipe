import BlogRepository from "../core/contracts/blog_repository";
import Post from "../core/contracts/post";
import SPost from "../databases/sequelize/models/s_post";
import { PostImpl } from "../core/entities/post_impl";
import AppError from "../core/errors/app_error";
import CommentableBLogRepository from "../core/contracts/commentable_blog_repository";
import Comment from "../core/contracts/comment";
import SComment from "../databases/sequelize/models/s_comment";
import CommentImpl from '../core/entities/comment_impl';
import UserBlogRepository from "../core/contracts/user_blog_repository";
import User from "../core/contracts/user";
import SUser from "../databases/sequelize/models/s_user";

class BlogRepositoryWithDatabase implements BlogRepository, CommentableBLogRepository, UserBlogRepository {
    
    async createPost(post: Post): Promise<Post> {
        const newPost = await SPost.create({id: post.id, SUserId: post.SUserId, title: post.title, text: post.text, likes: post.likes})
        return newPost.get() as PostImpl;
    }
    
    async deletePost(id: string): Promise<void> {
        const post = await this.retrievePost(id)
        await SPost.destroy({where: {id: post.id}});
    }
    
    async retrievePost(id: string): Promise<Post> {
        const post = await SPost.findByPk(id);
        if (post) {
            return post?.get() as PostImpl;
        } else {
            throw new AppError('Post Não Encontrado', 404)
        }
    }
    
    async retrieveAllPosts(): Promise<Post[]> {
        const posts: Post[] = (await SPost.findAll()).map((post) => {
            return post.get() as PostImpl
        });
        return posts;
    }
    
    async updatePost(post: Post): Promise<void> {
        const oldPost = await this.retrievePost(post.id)
        await SPost.update({title: post.title, text: post.text, likes: post.likes}, {where: {id: oldPost.id}});
    }
    
    async createComment(postId: string, comment: Comment): Promise<Comment> {
        this.retrievePost(postId);
        const newComment = await SComment.create({id: comment.id, SUserId: comment.SUserId, text: comment.text, SPostId: postId})
        
        return newComment.get() as CommentImpl
    }
    
    async retrieveCommnent(postId: string, commentId: string): Promise<Comment> {
        const comment = await SComment.findOne({where: {
            postId: postId,
            id: commentId,
        }});
        if(comment) {
            return comment.get() as CommentImpl;
        } else {
            throw new AppError('Comentário não encontrado', 404)
        }
    }
    
    async retrieveAllCommentsByPost(postId: string): Promise<Comment[]> {
        const comments = await SComment.findAll({
            where:{ postId: postId },
            order: [
                ['createdAt','DESC']
            ]
        })
        return comments.map((comment) => comment.get() as CommentImpl);
    }
    
    async retrieveAllComments(): Promise<Comment[]> {
        const comments = await SComment.findAll()
        return comments.map((comment) => comment.get() as CommentImpl);
    }
    
    async updateComment(postId: string, comment: Comment): Promise<void> {
        const currentComment = await this.retrieveCommnent(postId, comment.id)
        await SComment.update({text: comment.text}, {where: {postId: postId, id: currentComment.id}})
    }
    
    async deleteComment(postId: string, commentId: string): Promise<void> {
        const comment = await this.retrieveCommnent(postId, commentId)
        await SComment.destroy({where: {postId: postId, id: comment.id}})
    }
    
    async createUser(user: User): Promise<void> {
        
        await SUser.create({id: user.id, name: user.name, email: user.email, password: user.password })
    }
    async retrieveUser(email: string): Promise<User> {
        const user = await SUser.findOne({where: {email: email}})
        if(user) {
            return user.get() as User;
        }
        throw new AppError('Usuário não encontrado!', 404)
    }
    async retrieveAllUsers(): Promise<User[]> {
        const users =  await SUser.findAll();

        return users.map((user) => user.get() as User);
    }
}

const blogRepositoryWithDatabase: BlogRepositoryWithDatabase = new BlogRepositoryWithDatabase();

export default blogRepositoryWithDatabase;