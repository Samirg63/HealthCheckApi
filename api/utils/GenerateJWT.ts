import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import {UnauthorizedError} from '../errors/UnauthorizedError'
dotenv.config();

export function generateJWT(data:Object){
    const token:string = jwt.sign({...data,exp:Math.floor(Date.now() / 1000) + (60*60*24) /*1 day expiration*/},process.env.JWT_SECRET as string);
    return token;
}

export function verifyToken(token:string){
    return jwt.verify(token,process.env.JWT_SECRET as string)
}   