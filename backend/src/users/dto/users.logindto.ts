import { IsString, Equals, Matches } from "class-validator";

export class logindto{
    @IsString()
    @Matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {message: 'неверный форма email'})
    email: string

    @IsString()
    password: string;

    @Equals(true, { message: 'Нужно принять политику пользования' })
    accept: Boolean;
}