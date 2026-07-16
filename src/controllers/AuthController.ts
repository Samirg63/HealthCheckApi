import type { NextFunction, Request, Response } from "express";
import {ApiResponse} from '../utils/ApiResponse'
import AuthService from "../services/AuthService";
import type { IAuth } from "../types/Auth";
import {UnprocessableContent} from '../errors/UnprocessableContentError'
import { verifyToken } from "../utils/GenerateJWT";
import { UnauthorizedError } from "../errors/UnauthorizedError";

export default class AuthController{

    async register(req:Request,res:Response,next:NextFunction){
        try {
            const data:IAuth = req.body
            if(!data || !data.email || !data.password){
                throw new UnprocessableContent('/auth/register')
            }

            const registerToken = await AuthService.register(data)
            ApiResponse.success(res,201,{token:registerToken})
        } catch (error) {
            next(error)
        }
    }

    async login(req:Request,res:Response,next:NextFunction){
        try {
            const data:IAuth = req.body
            if(!data || !data.email || !data.password){
                throw new UnprocessableContent('/auth/login')
            }

            const loginToken = await AuthService.login(data)
            ApiResponse.success(res,201,{token:loginToken})
        } catch (error) {
            next(error)
        }
    }

    async verifyToken(req:Request,res:Response,next:NextFunction){
        try {
            const token = req.headers.authorization?.split(' ')[1];
            verifyToken(token!)
            ApiResponse.success(res,200)
        } catch (error) {
            next(new UnauthorizedError('/verify'))
        }
    }
}