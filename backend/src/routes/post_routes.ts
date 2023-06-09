import { NextFunction, Request, Response, Router } from 'express';
import { PostImpl } from '../core/entities/post_impl';
import Post from '../core/contracts/post';
import BlogRepository from '../core/contracts/blog_repository';
import blogRepositoryWithDatabase from '../repositories/blog_repository_with_database';
import AppError from '../core/errors/app_error';
import authMiddleware from '../core/middlewares/auth_middleware';


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
postRoutes.delete('/posts/:postId', authMiddleware, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const {postId} = request.params;
        const {userId} = request.headers;
        
        const post = await repository.retrievePost(postId)

        console.log(post.SUserId);
        console.log(userId);

        if(post.SUserId !== userId) {
            throw new AppError('Você não pode apagar posts que não são seus!', 401);
        }
        
        await repository.deletePost(postId);
        return response.status(204).send();
    } catch (error) {
        next(error)
    }
    
})

postRoutes.post('/posts', authMiddleware,  async (request: Request, response: Response, next: NextFunction) => {
    try {
        const {title, text} = request.body;
        console.log(request.headers);
        const { userId } = request.headers;

        if(!text) throw new AppError('O post precisa de um texto', 400)
        if(!title) throw new AppError('O post precisa de um título', 400)
        if(!userId) throw new AppError('O post deve estar associado a um usuário', 400)

        const post: Post = await repository.createPost(new PostImpl(title, userId as string, text));
        return response.status(201).json(post);
    } catch (error) {
        next(error)
    }

})

postRoutes.put('/posts/:postId', authMiddleware, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const {postId} = request.params;
        const {userId} = request.headers;

        const post: Post = await repository.retrievePost(postId as string);
        
        if(post.SUserId !== userId) {
            throw new AppError('Você não pode editar posts que não são seus!', 401);
        }

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
postRoutes.patch('/posts/:postId', authMiddleware,  async (request: Request, response: Response, next: NextFunction) => {
    try {
        const {postId} = request.params;
        const {userId} = request.headers;
        
        const post: Post = await repository.retrievePost(postId as string);

        if(post.SUserId !== userId) {
            throw new AppError('Você não pode editar posts que não são seus!', 401);
        }

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