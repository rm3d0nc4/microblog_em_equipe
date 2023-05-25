import { NextFunction, Request, Response, Router } from "express";
import BlogRepository from "../core/contracts/blog_repository";
import blogRepositoryWithDatabase from "../repositories/blog_repository_with_database";
import Comment from "../core/contracts/comment";
import CommentableBLogRepository from "../core/contracts/commentable_blog_repository";
import { request } from "http";
import CommentImpl from "../core/entities/comment_impl";
import AppError from "../core/errors/app_error";


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

commentRoutes.post('/posts/:postId/comments', async (request: Request, response: Response, next: NextFunction) => {
    try {
        const {postId} = request.params
        const {text} = request.body;
        if(!text) throw new AppError('O comentário precisa de um texto', 400)

        const comment: Comment = new CommentImpl(text)
        await repository.createComment(postId, comment);

        return response.status(201).json(comment)
    } catch (error) {
        next(error)
    }
})

commentRoutes.delete('/posts/:postId/comments/:commentId', async (request: Request, response: Response, next: NextFunction) => {
    try {
        const {postId, commentId} = request.params
        await repository.deleteComment(postId, commentId)
        return response.status(204).send();
    } catch (error) {
        next(error)
    }
})

commentRoutes.put('/posts/:postId/comments/:commentId', async (request: Request, response: Response, next: NextFunction) => {
    try {
        const {postId, commentId} = request.params
        const {text} = request.body
        if(!text) throw new AppError('O comentário precisa de um texto', 400)

        const comment = await repository.retrieveCommnent(postId, commentId);
        comment.text = text;
        await repository.updateComment(postId, comment);
        return response.status(200).send();
    } catch (error) {
        next(error)
    }
})