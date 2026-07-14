import { Response } from "express";
import { IResult } from "../types/Result";

export class ApiResponse{

    static success<T>(
        res:Response,
        status:number,
        data?:T
    ){
        let result:IResult<T> = {
            status:status,
            success:true,
            errors:[]
        }

        if(data) result.data = data;
        
        return res.status(status).json(result)
    }
}