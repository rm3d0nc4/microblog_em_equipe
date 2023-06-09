import { NextFunction, Request, Response } from "express";
import * as jwt from 'jsonwebtoken'
import * as dotenv from "dotenv";
import AppError from "../errors/app_error";

dotenv.config();
const tokenSecret = process.env.TOKEN_SECRET as string;

export default function authMiddleware(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;
    const accesToken = authHeader && authHeader.split(' ')[1]

    if(!accesToken) {
        throw new AppError('Token Vazio', 400);
    }

    try {
        const payload: jwt.JwtPayload = jwt.verify(accesToken, tokenSecret) as jwt.JwtPayload;
        const userId: string = payload.user;
        request.headers.userId = userId;
        next();
    } catch (error) {
        console.log(error)
        throw new AppError('Token inválido ou expirado', 403);
    }
    
}