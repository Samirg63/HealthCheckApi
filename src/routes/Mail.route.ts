import {  Router } from "express";
import MailController from "../controllers/MailController";
import type { IMail } from "../types/Controllers/IMail";



const MailRoute:Router = Router();
const controller:IMail = new MailController();

MailRoute.get('/',controller.check)
MailRoute.post('/',controller.send)


export default MailRoute;