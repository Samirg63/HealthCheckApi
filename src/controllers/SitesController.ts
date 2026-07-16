
import type {ISite} from '../types/Site'
import SiteService from "../services/SiteService";
import type { NextFunction, Request, Response } from "express";
import {ApiResponse} from '../utils/ApiResponse'
import type { DeleteResult } from 'mongoose';
import type { IHealthResponse } from '../types/health';


export default class SitesController{
    
    
    async create(req:Request,res:Response,next:NextFunction){
        try {
            const response:ISite = await SiteService.create(req.body as ISite);
            return ApiResponse.success(res,201,response)
        } catch (error) {
           next(error)
        }
    }

    async get(req:Request,res:Response,next:NextFunction){
        try {
            let response:ISite[];
            if(Object.keys(req.query).length){
                const attr = Object.keys(req.query)[0] as keyof ISite;           
                response = await SiteService.getByAttr(attr,req.query[attr] as ISite[typeof attr] );
            }else{
                response = await SiteService.getAll();
            }
            
            return ApiResponse.success(res,200,response);
            
        } catch (error) {
            next(error)
        }
    }

    async getHealth(req:Request,res:Response,next:NextFunction){
         try {
            let response:IHealthResponse[] = await SiteService.getHealth()
            return ApiResponse.success(res,200,response);           
        } catch (error) {
            next(error)
        }
    }

    

    async delete(req:Request,res:Response,next:NextFunction){
        try {

            const response:DeleteResult = await SiteService.delete(req.params.id as string);
            
            return ApiResponse.success<DeleteResult>(
                res,
                200,
                response    
            )
        } catch (error) {
            next(error)
        }
    }

    async update(req:Request,res:Response,next:NextFunction){
        try {       

            const response:ISite = await SiteService.update(req.params.id as string,req.body as Partial<ISite>);
            return ApiResponse.success<ISite>(
                res,
                200,
                response    
            )
        } catch (error) {
            next(error)
        }
    }
}