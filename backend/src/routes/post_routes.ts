import { NextFunction, Request, Response, Router, response } from 'express';
import { PostImpl } from '../core/entities/post_impl';
import Post from '../core/contracts/post';
import BlogRepository from '../core/contracts/blog_repository';
import blogRepositoryWithMicroblog from '../repositories/blog_repository_with_microblog';
import blogRepositoryWithDatabase from '../repositories/blog_repository_with_database';
import AppError from '../core/errors/app_error';


export const postRoutes: Router = Router();


// const repository: BlogRepository = blogRepositoryWithMicroblog; 
const repository: BlogRepository = blogRepositoryWithDatabase; 

postRoutes.get('/posts', async (request: Request, response: Response, next: NextFunction) => {
    try {
        const posts: Post[] =  await repository.retrieveAllPosts();
        return response.status(200).json(posts)            
    } catch (error) {
        next(error)
    }

})
postRoutes.get('/posts/:postId', async (request: Request, response: Response, next: NextFunction) => {
    try {
        const {postId} = request.params;
        const post = await repository.retrievePost(postId as string)
        return response.status(200).json(post)
    } catch (error) {
        next(error)
    }
    
})
postRoutes.delete('/posts/:postId', async (request: Request, response: Response, next: NextFunction) => {
    try {
        const {postId} = request.params;
        await repository.deletePost(postId as string);
        return response.status(204).send();
    } catch (error) {
        next(error)
    }
    
})

postRoutes.post('/posts', async (request: Request, response: Response, next: NextFunction) => {
    try {
        const {text} = request.body;
        if(!text) throw new AppError('O comentário precisa de um texto', 400)

        const post = new PostImpl(text);
        await repository.createPost(post);
        return response.status(201).json(post);
    } catch (error) {
        next(error)
    }

})

postRoutes.put('/posts/:postId', async (request: Request, response: Response, next: NextFunction) => {
    try {
        const {postId} = request.params;
        const post: Post = await repository.retrievePost(postId as string);
        const {text, likes} = request.body;
        if(!text) throw new AppError('O comentário precisa de um texto', 400)
        if(!likes) throw new AppError('O comentário precisa ter likes', 400)

        post.text = text;
        post.likes = likes;
        
        repository.updatePost(post);

        return response.status(200).send();
    } catch (error) {
        next(error)
    }

})
postRoutes.patch('/posts/:postId', async (request: Request, response: Response, next: NextFunction) => {
    try {
        const {postId} = request.params;
        const post: Post = await repository.retrievePost(postId as string);
        const {text, likes} = request.body;
        if(!text && !likes) throw new AppError('Para atualizar post, pelo menos um valor deve ser alterado', 400)
        post.text = text ?? post.text;
        post.likes = likes ?? post.likes;
        
        repository.updatePost(post);

        return response.status(200).send();
    } catch (error) {
        next(error)
    }

})
postRoutes.patch('/posts/:postId/like', async (request: Request, response: Response, next: NextFunction) => {
    try {
        const {postId} = request.params;
        const post: Post = await repository.retrievePost(postId as string);
        post.likes++;
        await repository.updatePost(post);
    
        return response.status(200).json({
            likes: post.likes
        });;
    } catch (error) {
        next(error)
    }

})