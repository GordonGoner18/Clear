import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { createdto } from './users.dto.js';
import { logindto } from './users.logindto.js';

@Controller('users')
export class UsersController {
    constructor(private readonly UsersService: UsersService){}
    @Post('reg')
    CreateUser(@Body() body: createdto){
        return this.UsersService.CreateUser(body);
    }

    @Post('login')
    @HttpCode(200)
    Login(@Body() body: logindto){
        return this.UsersService.findUser(body)
    }

}
