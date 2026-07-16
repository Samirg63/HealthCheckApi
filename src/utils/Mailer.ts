import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import { InternalServerError } from '../errors/InternalServerError';


dotenv.config()


    const mailer = nodemailer.createTransport({
        host:"smtp.gmail.com",
        port:465,
        secure:true,
        auth:{
            user:process.env.MAIL_USER,
            pass:process.env.MAIL_PASS
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