import { NextFunction, Request, Response, Router } from "express";
import blogRepositoryWithDatabase from "../repositories/blog_repository_with_database";
import Comment from "../core/contracts/comment";
import CommentableBLogRepository from "../core/contracts/commentable_blog_repository";
import CommentImpl from "../core/entities/comment_impl";
import AppError from "../core/errors/app_error";
import authMiddleware from "../core/middlewares/auth_middleware";


export const commentRoutes: Router = Router();


const repository: CommentableBLogRepository = blogRepositoryWithDatabase;

commentRoutes.get('/posts/:postId/comments', async (request: Request, response: Response, next: NextFunction) => {
    try {
        const {postId} = request.params;
        const posts: Comment[] =  await repository.retrieveAllCommentsByPost(postId);
        return response.status(200).json(posts)            
    } catch (error) {
        next(error)
    }
})

commentRoutes.get('/posts/:postId/comments/:commentId', async (request: Request, response: Response, next: NextFunction) => {
    try {
        const {postId, commentId} = request.params
        const comment: Comment = await repository.retrieveCommnent(postId, commentId);
        return response.status(200).json(comment)
    } catch (error) {
        next(error)
    }
})

commentRoutes.get('/allComments', async (request: Request, response: Response, next: NextFunction) => {
    try {
        const comments: Comment[] =  await repository.retrieveAllComments();
        return response.status(200).json(comments);
    } catch (error) {
        next(error)
    }
});

commentRoutes.post('/posts/:postId/comments', authMiddleware, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const {postId} = request.params
        const {text} = request.body;
        const {userId} = request.headers;
        if(!text) throw new AppError('O comentário precisa de um texto', 400)

        const comment: Comment = await repository.createComment(postId, new CommentImpl(text, userId as string));

        return response.status(201).json(comment)
    } catch (error) {
        next(error)
    }
})

commentRoutes.delete('/posts/:postId/comments/:commentId', authMiddleware, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const {postId, commentId} = request.params
        const {userId} = request.headers;
        const comment: Comment = await repository.retrieveCommnent(postId, commentId);

        if(comment.SUserId !== userId) {
            throw new AppError('Você não pode apagar posts que não são seus!', 401);
        }

        await repository.deleteComment(postId, commentId)
        return response.status(204).send();
    } catch (error) {
        next(error)
    }
})

commentRoutes.put('/posts/:postId/comments/:commentId', authMiddleware, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const {postId, commentId} = request.params;
        const {text} = request.body;
        const {userId} = request.headers;

        if(!text) throw new AppError('O comentário precisa de um texto', 400)

        const comment = await repository.retrieveCommnent(postId, commentId);
        
        if(comment.SUserId !== userId) {
            throw new AppError('Você não pode apagar posts que não são seus!', 401);
        }

        comment.text = text;
        await repository.updateComment(postId, comment);
        return response.status(200).send();
    } catch (error) {
        next(error)
    }
})