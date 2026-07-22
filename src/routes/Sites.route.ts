import {  Router } from "express";
import SitesController from "../controllers/SitesController";
import { auth } from "../middlewares/auth.middleware";


const SitesRoute:Router = Router();
const controller = new SitesController();


SitesRoute.use(auth);
SitesRoute.post('/',controller.create)
SitesRoute.get('/',controller.get)
SitesRoute.get('/health',controller.getHealth)
SitesRoute.delete('/:id',controller.delete)
SitesRoute.put('/:id',controller.update)

export default SitesRoute;