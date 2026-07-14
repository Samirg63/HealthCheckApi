import { InternalServerError } from "../errors/InternalServerError";
import type { IHealthResponse,IHealth } from "../types/health";
import type { IMailer } from "../types/IMailer";
import { mailer } from "../utils/Mailer";
import dotenv from 'dotenv';

dotenv.config()

export default class MailService{

    static async send(healthStatus:Record<string,IHealthResponse>){
        const mailBody = this.formatToMail(healthStatus) ? this.formatToMail(healthStatus) : false ;

        if(!mailBody) return "No error was detected.";

        const mailData:IMailer = {
            from:`"HealthCheck" <${process.env.MAIL_USER}>`,
            to:process.env.MAIN_EMAIL as string,
            subject:"A problem was detected on your site.",
            text:mailBody as string
        }

        try {
            const sending = await mailer.sendMail(mailData)

            if(sending.messageId) return true;

            throw new InternalServerError('/mail/');
        } catch (error) {
            throw error
        }

           
    }

    static formatToMail(healthStatus:Record<string,IHealthResponse>):string|false{
        let hasError:boolean = false;

        const formatedErrors = Object.keys(healthStatus).reduce((acc:any,key:string)=>{
            if (typeof healthStatus[key] !== 'object') return acc;
            
            
            //loop inside each object (frontend, backend, etc)
            Object.keys(healthStatus[key]!).forEach((dataKey:string)=>{
                
                //if some error are reported, add it to formated errors (create a new key on object error if it not exists)
                if((healthStatus[key]![dataKey as keyof IHealthResponse]! as IHealth).success == false){
                    hasError = true;
                    if(!acc[key]){
                        acc[key] = []
                    }
                    
                    acc[key].push(dataKey)
                }

                //if exists a api array, loop inside it and do the same process
                if(Array.isArray(healthStatus[key]![dataKey as keyof IHealthResponse]!)){
                    (healthStatus[key]![dataKey as keyof IHealthResponse]! as []).forEach((apiData:{[key:string]:IHealth})=>{
                        Object.keys(apiData).forEach((apiDataKey:string)=>{
                            if(!(apiData[apiDataKey] as unknown as IHealth).success){   
                                hasError = true                           
                                if(!acc[key]){
                                    acc[key] = []
                                }
                                acc[key].push(apiDataKey+" API")
                            }

                        })
                    })
                }
            })

            return acc;
        },{})
        

        if(!hasError) return false;

        let healthStatusErrorstoMail = "Foram encontrados alguns erros nos seguintes serviços: \n";

        Object.keys(formatedErrors).forEach((errorKey)=>{
            console.log(errorKey)
            healthStatusErrorstoMail += `• ${errorKey}: `
            formatedErrors[errorKey].forEach((errorData:string,index:number)=>{
                if(index == 0){
                    healthStatusErrorstoMail += errorData;
                    return;
                }

                 healthStatusErrorstoMail += `, ${errorData}`
            })

            healthStatusErrorstoMail+= "\n"
        })

        return healthStatusErrorstoMail;

    }


}

