import type { NextFunction, Request, Response } from "express";

export interface IMail{
    send(req:Request,res:Response,next:NextFunction):Promise<void>;
}