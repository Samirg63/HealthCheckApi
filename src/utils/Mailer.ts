import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import { InternalServerError } from '../errors/InternalServerError';
import dns from "node:dns";


dotenv.config()


    const mailer = nodemailer.createTransport({
        host:"smtp.gmail.com",
        port:465,
        secure:true,
        auth:{
            user:process.env.MAIL_USER,
            pass:process.env.MAIL_PASS
        },
        tls:{
            servername:"smtp.gmail.com"
        },
        lookup(hostname,options,callback){
            return dns.lookup(hostname,{family:4},callback)
        }
    })

    
    export async function verifyMailer(){
        try{
            await mailer.verify();
            console.log('Mailer is working')
        }catch(e){
            console.error(e)
            throw new InternalServerError('Mailer service');
        }

    }

export {mailer};