import { IsString, Matches, MaxLength, MinLength } from "class-validator";
import { codedto } from "./users.find-email-for-recovery-dto.js";

export class setnewpasswordto extends codedto{
    @IsString()
    @MinLength(8, {message: 'min length 8 symbols'})
    @MaxLength(20, {message: 'max length 20 symbols'})
    @Matches(/^(?=.*[A-Za-zА-Яа-я])(?=.*\d)\S{8,20}$/, {message: 'Пароль должен содержать хотя бы одну букву и одну цифру'})
    password: string;
}


