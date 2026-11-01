import { IsString, Matches } from "class-validator";

export class findeamildto{
    @IsString()
    @Matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {message: 'неверный форма email'})
    email: string
}

export class codedto{
    @IsString()
    code: string
    @IsString()
    @Matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {message: 'неверный форма email'})
    email: string
}
