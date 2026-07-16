import { Router } from "express";
import AuthController from "../controllers/AuthController";

const AuthRoute:Router = Router();
const controller = new AuthController();

AuthRoute.post('/register',controller.register)
AuthRoute.post('/login',controller.login)
AuthRoute.post('/verify',controller.verifyToken)


export default AuthRoute;