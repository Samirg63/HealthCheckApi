import { NextFunction, Request, Response } from "express";
import { ApiError } from "../errors/ApiError";

export function errorHandler(
    error:unknown,
    req:Request,
    res:Response,
    next:NextFunction
){

   if(error instanceof ApiError){
        return res.status(error.status).json({
            success:false,
            errors:[{
                title:error.title,
                status:error.status,
                detail:error.detail,
                instance:error.instance
            }]
        })
   }
   
   return res.status(500).json({
            success:false,
            errors:[{
                title:"Internal Server Error",
                status:500,
                detail:"Unexpected error",
                instance:req.originalUrl
            }]
        })
}