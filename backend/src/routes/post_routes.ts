import { NextFunction, Request, Response, Router } from 'express';
import { PostImpl } from '../core/entities/post_impl';
import Post from '../core/contracts/post';
import BlogRepository from '../core/contracts/blog_repository';
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
        const {title, text, userId} = request.body;
        if(!text) throw new AppError('O comentário precisa de um texto', 400)

        const post: Post = await repository.createPost(new PostImpl(title, userId, text));
        return response.status(201).json(post);
    } catch (error) {
        next(error)
    }

})

postRoutes.put('/posts/:postId', async (request: Request, response: Response, next: NextFunction) => {
    try {
        const {postId} = request.params;
        const post: Post = await repository.retrievePost(postId as string);
        const {title, text, likes} = request.body;
        if(!title) throw new AppError('O comentário precisa de um título', 400)
        if(!text) throw new AppError('O comentário precisa de um texto', 400)
        if(!likes) throw new AppError('O comentário precisa ter likes', 400)

        post.title = title;
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
        const {title, text, likes} = request.body;
        if(!text && !likes && !title) throw new AppError('Para atualizar post, pelo menos um valor deve ser alterado', 400)
        post.title = title ?? post.title;
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
        const {like} = request.body;

        if(Object.keys(request.body).length !== 0 && !like) {
            return response.status(400).send();
        }
        
        
        const post: Post = await repository.retrievePost(postId as string);
        like ? post.likes += like : post.likes++;
        await repository.updatePost(post);
    
        return response.status(200).json({
            likes: post.likes
        });
    } catch (error) {
        next(error)
    }

})