import { NotFound } from '../errors/NotFoundError';
import {ConflictError} from '../errors/ConflictError'
import type {IAuth} from '../types/Auth'
import bcrypt from 'bcrypt'
import {AuthModel} from '../db/schemas/AuthSchema'
import { InternalServerError } from '../errors/InternalServerError';
import {generateJWT} from '../utils/GenerateJWT'
import { UnauthorizedError } from '../errors/UnauthorizedError';



export default class AuthService{

    static async register(data:IAuth){

        //verify Email
        const emailAlredyExists = await this.verifyEmail(data.email);
        if(emailAlredyExists.length){
            throw new ConflictError('/auth/register','Email already used')
        }

        const saltRounds:number = 10;
        const hashedpassword = await bcrypt.hash(data.password,saltRounds);

        try {
            const register = await AuthModel.create({email:data.email,password:hashedpassword});
            return generateJWT(register)
           
        } catch (error) {
            throw new InternalServerError('/auth/register')
        }
    }

    static async login(data:IAuth){
        //data on db
        const dbUser = await this.verifyEmail(data.email);
        if(!dbUser.length){
            throw new UnauthorizedError('/auth/login',"Wrong Credentials")
        }

        //verify password
        if(!await bcrypt.compare(data.password,dbUser[0]!.password)){
            throw new UnauthorizedError('/auth/login',"Invalid Password")
        }

        //All right

        return generateJWT(dbUser[0]!);
    }

    static async verifyEmail(email:string):Promise<IAuth[]>{            
            try {
                const response:IAuth[] = await AuthModel.find({email:email});
                return response;
            } catch (error) { 
                throw new InternalServerError('/auth')
            }
        }
}