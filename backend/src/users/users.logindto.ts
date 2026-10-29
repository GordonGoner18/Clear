import { IsString, Equals } from "class-validator";

export class logindto{
    @IsString()
    email: string;

    @IsString()
    password: string;

    @Equals(true, { message: 'Нужно принять политику пользования' })
    accept: Boolean;
}