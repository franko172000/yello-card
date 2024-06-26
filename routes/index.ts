import { Router } from 'express';
const router = Router();
import AuthController from "../app/controllers/AuthController";
import AuthMiddleware from "../app/Midlleware/AuthMiddleware";
import {registerValidation} from "../app/validations";
import AppController from "../app/controllers/AppController";
const { validate} = require('express-validation')
const validateToken = AuthMiddleware.validateToken.bind(AuthMiddleware)

//auth routes
router.get('/', AppController.sayHello.bind(AppController));
router.post('/auth/register', validate(registerValidation, {keyByField: true}), AuthController.register.bind(AuthController));
router.post('/auth/logout', validateToken, AuthController.logout.bind(AuthController));
router.post('/auth/login', AuthController.login.bind(AuthController));

export default router;
