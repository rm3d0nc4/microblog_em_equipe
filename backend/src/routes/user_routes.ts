import { NextFunction, Request, Response, Router } from "express";
import UserBlogRepository from "../core/contracts/user_blog_repository";
import blogRepositoryWithDatabase from "../repositories/blog_repository_with_database";


const repository: UserBlogRepository = blogRepositoryWithDatabase;

export const userRoutes: Router = Router()

userRoutes.get('/users/:userId', async (request: Request, response: Response, next: NextFunction) => {
    try {
        const {userId} = request.params;
        const user =  await repository.retrieveUserById(userId);
        return response.status(200).json(user);
    } catch (error) {
        next(error)
    }
})

userRoutes.get('/users', async (request: Request, response: Response, next: NextFunction) => {
    try {
        const users =  await repository.retrieveAllUsers();
        return response.status(200).json(users);
    } catch (error) {
        next(error)
    }
})
