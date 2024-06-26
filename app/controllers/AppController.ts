import {NextFunction, Request, Response} from 'express';
import {Container, Service} from "typedi";
import AppService from "../services/AppService";

@Service()
class AppController {
    constructor(private readonly appService: AppService) {}
    async sayHello(req: Request, res: Response, next: NextFunction) {
        try{
            return res.status(200).json({
                message: this.appService.sayHello()
            })
        }catch (err: any){
            next(err)
        }
    }
}
export default Container.get(AppController)