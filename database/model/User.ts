import * as bcrypt from 'bcryptjs';
import {AutoIncrement, BeforeCreate, Column, PrimaryKey, Table} from "sequelize-typescript";
import BaseModel from "./BaseModel";
import {Service} from "typedi";
import {DataTypes} from "sequelize";

@Table({
    tableName: 'users',
})
@Service()
export default class User extends BaseModel {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @Column({
        allowNull: false,
        type: DataTypes.STRING,
    })
    firstname: string

    @Column({
        allowNull: false,
        type: DataTypes.STRING,
    })
    lastname: string

    @Column({
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
    })
    email: string

    @Column({
        allowNull: false,
        type: DataTypes.STRING,
    })
    password: string

    @BeforeCreate
    static hashPassword(user: User) {
        user.password = bcrypt.hashSync(user.password);
    }
}