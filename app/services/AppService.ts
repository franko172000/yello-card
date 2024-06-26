import {Service} from "typedi";

@Service()
export default class AppService {
    constructor() {}
    sayHello(): string {
        return 'Hello world'
    }
}