import { IsString, Matches, MaxLength, MinLength, Equals } from "class-validator";

export class createdto {
    @IsString()
    @MinLength(8, {message: 'min length 8 symbols'})
    @MaxLength(20, {message: 'max length 20 symbols'})
    @Matches(/^(?=.*[A-Za-zА-Яа-я])(?=.*\d)\S{8,20}$/, {message: 'Пароль должен содержать хотя бы одну букву и одну цифру'})
    password: string;
    @IsString()
    @MinLength(2, {message: 'минимальная длинна имени 2 символов'})
    @MaxLength(20, {message: 'максимальная длинна имени 20 символов'})
    name: string;
    @IsString()
    @Matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {message: 'invalid email'})
    email: string;
    @Equals(true, { message: 'Нужно принять политику пользования' })
    accept: boolean;
}