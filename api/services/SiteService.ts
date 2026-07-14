import { SiteModel } from "../db/schemas/siteSchema";
import { InternalServerError } from "../errors/InternalServerError";
import {UnprocessableContent} from '../errors/UnprocessableContentError'
import type { ISite } from "../types/Site";
import {NotFound} from '../errors/NotFoundError'
import { ApiError } from "../errors/ApiError";
import {type DeleteResult, isValidObjectId } from "mongoose";
import type { IHealthResponse } from "../types/health";
import MailService from "./MailService";


export default class SiteService{

    static async create(body:ISite):Promise<ISite>{
        if(!body.name || !body.url){
            throw new UnprocessableContent('/sites');
        }

        try {
            return await SiteModel.create(body) as unknown as ISite
        } catch (error) {
            throw new InternalServerError('/sites')
        }      
    }

    static async getAll():Promise<ISite[]>{
        try {
            return await SiteModel.find();
        } catch (error) {
            throw new InternalServerError('/sites')
        }
    }

    static async getByAttr<K extends keyof ISite>(attr:K,value:ISite[K]):Promise<ISite[]>{
        
        try {
            const response:ISite[] = await SiteModel.find({[attr]:value});
            
            if(!response.length){    
                throw new NotFound(`/sites?${attr}=${value}`)
                
            }

            return response;
        } catch (error) {
            if(error instanceof ApiError){
                throw error;
            }   
            throw new InternalServerError('/sites')
        }
    }

    static async delete(id:string){
        try {
            const response:DeleteResult = await SiteModel.deleteOne({_id:id})
            if(!response.deletedCount){
                throw new NotFound(`/sites/${id}`)
            }
            
            return response;
        } catch (error) {
            if(error instanceof ApiError){
                throw error;
            }   
            throw new InternalServerError('/sites/'+id)
        }
    }

    static async update(id:string, value:Partial<ISite>):Promise<ISite>{
        
        try {
            if(!isValidObjectId(id)){
                console.log('id')
                throw new NotFound(`/sites/${id}`)
            }

            const response = await SiteModel.findOneAndUpdate({_id:id},value);
            console.log(response)      
            
            return {...response?.toObject(),...value} as ISite;
        } catch (error) {
            if(error instanceof ApiError){
                throw error;
            }   
            throw new InternalServerError('/sites/'+id)
        }
    }

    static async getHealth():Promise<IHealthResponse[]>{
        try {
            const sites:ISite[] = await this.getAll();
            const requests:Promise<any>[] = [];
            sites.forEach((site:ISite)=>{
               requests.push(fetch(site.url).then(res => res.json()))
            })
            
            const result = await Promise.all(requests)
            const formatedResult = result.reduce((acc,data,index)=>{
                acc[sites[index]!.name] = {...data,url:sites[index]?.url,id:sites[index]?._id};
                return acc;
            },{})
            
            await MailService.send(formatedResult)
            
            return formatedResult as IHealthResponse[];
        } catch (error) {
            throw new InternalServerError('/sites/health')
        }
        
    }
}