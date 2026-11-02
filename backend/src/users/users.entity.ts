import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('users')
export class User{
    @PrimaryGeneratedColumn()
    id: number;
    @Column({default: ''})
    name: string;
    @Column({default: ''})
    password: string;
    @Column({unique: true})
    email: string;
    @Column()
    accept: boolean;
}

@Entity('RecoveryPasswordCode')
export class RecoveryPasswordCode{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    code: string;
    @Column({unique: true})
    email: string;
    @Column({default: new Date(0)})
    createTime: Date;
}