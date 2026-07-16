import type { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'

dotenv.config();

export function auth(
    req:Request,
    res:Response,
    next:NextFunction
){
    const token:string|undefined = req.headers.authorization;
    if(!token){
        return next(new UnauthorizedError(req.originalUrl))
    }

    try {
        jwt.verify(token.split(' ')[1]!,process.env.JWT_SECRET as string)
        next()
    } catch (error) {
        return next(new UnauthorizedError(req.originalUrl))
    }
}