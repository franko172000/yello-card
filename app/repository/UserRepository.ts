import User from "../../database/model/User";
import {Service} from "typedi";
import {IUser} from "../../Interfaces/AuthInterface";

@Service()
export default class UserRepository {
    async addUser (user: IUser): Promise<User>{
        return User.build({
            role: user.role,
            email: user.email,
            password: user.password
        }).save()
    }

    async find (email: string): Promise<User|null>{
        return User.findOne({
            where: {
                email,
            }
        })
    }
}