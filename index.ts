import express,{Express, Request, Response} from 'express'
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv'
import { connect } from './src/db/connection';
import SitesRoute from './src/routes/Sites.route';
import AuthRoute from './src/routes/Auth.route';
import MailRoute from './src/routes/Mail.route'
import { errorHandler } from './src/middlewares/ErrorHandler.middleware';
import { verifyMailer } from './src/utils/Mailer';

dotenv.config()

async function Main(){

    
    const app:Express = express();
    const port:number = 3000;
    
    //Middlewares
    app.use(bodyParser.json())
    app.use(cors({origin:process.env.DOMAIN as string}))
    
    //db
    await connect();

    //Mailer
    await verifyMailer();
    
    //Routes
    app.use("/sites",SitesRoute)
    app.use('/auth',AuthRoute)
    app.use('/mail',MailRoute)
    
    app.get('/',(req:Request,res:Response)=>{
        res.send('Hello world!');
    })
    
    //Error Handler
    app.use(errorHandler);

    app.listen(port,()=>{
        console.log(`Api is now running on Port:${port}`);
    })
}

Main();