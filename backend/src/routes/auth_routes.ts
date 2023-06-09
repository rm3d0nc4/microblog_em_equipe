import * as jwt from 'jsonwebtoken'
import * as dotenv from "dotenv";
import * as bcrypt from 'bcrypt';
import {v1 as  uuidv1} from 'uuid';
import { NextFunction, Request, Response, Router } from "express";
import UserBlogRepository from "../core/contracts/user_blog_repository";
import blogRepositoryWithDatabase from "../repositories/blog_repository_with_database";
import AppError from "../core/errors/app_error";
import { validateString } from "../core/utils/utils";
import User from '../core/contracts/user';

dotenv.config();
const tokenSecret = process.env.TOKEN_SECRET as string;

export const authRoutes = Router()

const repository: UserBlogRepository = blogRepositoryWithDatabase;

authRoutes.post('/register', async (request: Request, response: Response, next: NextFunction) => {
    try {
        const {email, password, name} = request.body;

        if(!validateString(email)) {
            throw new AppError('Email obrigatório!', 400);
        } 
        if(!validateString(password)) {
            throw new AppError('Senha obrigatória', 400);
        } 
        if(!validateString(name)) {
            throw new AppError('Nome obrigatório!', 400);
        } 

        const existingUser = await repository.retrieveUser(email).catch((error: Error) => {
            if(error instanceof AppError) {
                if(error.status !== 404) {
                    throw error;
                } else {
                    console.log('ok')
                }
            }
        });

        if(existingUser) {
            throw new AppError('Email já está em uso', 409)
        }

        
        const salt = await bcrypt.genSalt(10);
        
        const encryptedPassword = await  bcrypt.hash(password, salt);
        
        const user : User = {
            id: uuidv1(), 
            email: email, 
            password: encryptedPassword,
            name: name
        }

        const accesToken = jwt.sign({user: user.id}, tokenSecret, {expiresIn: '1800s'});
        
        await repository.createUser(user)
        return response.json({accesToken: accesToken})
    } catch (error) {
        next(error)
    }
})

authRoutes.post('/login', async (request: Request, response: Response, next: NextFunction) => {
    try {
        const {email, password} = request.body;
        if(!validateString(email)) {
            throw new AppError('Email obrigatório!', 400);
        } 
        if(!validateString(password)) {
            throw new AppError('Senha obrigatória', 400);
        } 
        
        const user: User = await repository.retrieveUser(email);
        
        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword) {
            throw new AppError('Senha Incorreta', 400);
        }
        
        const accesToken = jwt.sign({user: user.id}, tokenSecret, {expiresIn: '1800s'});

        return response.status(200).json({accesToken: accesToken})
    } catch (error) {
        next(error)
    }
})