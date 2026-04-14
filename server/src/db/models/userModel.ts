//DATABASE TABLE CREATION FILE

import { Table, Column, Model, DataType } from 'sequelize-typescript'

@Table({
    tableName: 'users',
    modelName: 'User',
    timestamps: true
})

export class User extends Model {
    @Column({
        primaryKey: true,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4
    })
    declare id: string

    @Column({
        type: DataType.STRING
    })
    declare username: string

    @Column({
        type: DataType.STRING,
        unique: true
    })
    declare email: string

    @Column({
        type: DataType.STRING,
    })
    declare password: string

    @Column({
        type: DataType.ENUM('super-admin', 'admin', 'teacher', 'student'),
        defaultValue: 'student'
    })
    declare roles: string

    @Column({
        type: DataType.STRING
    })
    declare currentInstituteNumber: string
}