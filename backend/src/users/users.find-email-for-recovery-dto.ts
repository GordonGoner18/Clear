import { IsString, Matches } from "class-validator";

export class findeamildto{
    @IsString()
    @Matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {message: 'неверный форма email'})
    email: string
}