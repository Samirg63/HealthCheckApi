import type { NextFunction, Request, Response } from "express";
import type { IMail } from "../types/Controllers/IMail";
import MailService from "../services/MailService";
import { ApiResponse } from "../utils/ApiResponse";

export default class MailController implements IMail{

    check(req:Request,res:Response,next:NextFunction){
        ApiResponse.success(res,200)
    }

    async send(req:Request,res:Response,next:NextFunction){
        try {
            const result = await MailService.send(req.body)
            ApiResponse.success(res,200,result);
        } catch (error) {
            next(error)
        }
    }

}

