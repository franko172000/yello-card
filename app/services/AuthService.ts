import {Service} from "typedi";
import UserRepository from "../repository/UserRepository";
import {IUser} from "../../Interfaces/AuthInterface";
import * as bcrypt from 'bcryptjs'
import AppError from "../Errors/AppError";
import * as jwt from "jsonwebtoken";
import {JwtPayload} from "jsonwebtoken";

@Service()
export default class AuthService {
    constructor(
        private readonly userRepo: UserRepository,
    ) {}
    async register(data: IUser): Promise<string> {

        const user = await this.userRepo.find(data.email);
        if(!user){
            const user = await this.userRepo.addUser(data)

            return this.generateToken(user.id)
        }

        throw new AppError({statusCode: 409, message: "Email already exists"})
    }
    async login({email, password}: {
        email: string,
        password: string
    }): Promise<String> {
        const user = await this.userRepo.find(email);
        if(user && bcrypt.compareSync(password, user.password)){
            return this.generateToken(user.id)
        }
        throw new AppError({statusCode: 401, message: "Invalid login credentials"})
    }

    generateToken(userId: number){
        return jwt.sign({
            id: userId,
        }, process.env.JWT_SECRET ?? '', {
            expiresIn: '7d'
        })
    }

    verifyToken(token: string): JwtPayload | string {
        try{
            return jwt.verify(token, process.env.JWT_SECRET ?? '')
        }catch (err: any){
            throw new AppError({message: err?.message})
        }
    }
}