import { NextFunction, Request, Response } from "express";
import AppError from "../errors/app_error";

export default function errorMiddleware(error: Error, request: Request, response: Response, next: NextFunction): Response {
    if(error instanceof AppError) {
        return response.status(error.status).json({
            message: error.message
        });
    }

    return response.status(500).json({
        status: 'unknown error',
        message: `Erro Interno: ${error.message}`
    });
}