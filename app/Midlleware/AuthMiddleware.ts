import AuthService from "../services/AuthService";
import {NextFunction, Request, Response} from "express";
import {Container, Service} from "typedi";

@Service()
class AuthMiddleware {
    private message = 'Unable to authenticate request. Invalid or missing token';
    constructor(private readonly authService: AuthService) {}

    async validateToken(req: Request, res: Response, next: NextFunction) {
        const headerAuth = req.headers?.authorization
        const token = headerAuth ? headerAuth.split(' ')[1] : '';
        try{
            //@ts-ignore
            req?.user = this.authService.verifyToken(token)
            //@ts-ignore
            req?.token = token
            return next()
        }catch (err: any){
            err.statusCode = 401
            err.message = this.message
            return next(err)
        }
    }
}
export default Container.get(AuthMiddleware)