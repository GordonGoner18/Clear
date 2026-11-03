import { Body, Controller, HttpCode, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { createdto } from './dto/users.dto.js';
import { logindto } from './dto/users.logindto.js';
import { SendemailService } from './users.sendletter.service.js';
import { codedto, findeamildto } from './dto/users.find-email-for-recovery-dto.js';
import { setnewpasswordto } from './dto/users.setnewpasswordto.js';

@Controller('users')
export class UsersController {
    constructor(private readonly UsersService: UsersService, private readonly SendEmailSerive: SendemailService){}
    @Post('reg')
    CreateUser(@Body() body: createdto){
        return this.UsersService.CreateUser(body);
    }

    @Post('login')
    @HttpCode(200)
    Login(@Body() body: logindto){
        return this.UsersService.findUser(body)
    }

    @Post('Recovery-Password')
    async SendEmail(@Body() body: findeamildto){
        await this.SendEmailSerive.SendEmail(body)
        return "Код отправлен"
    }

    @Post('Recovery-Password-code')
    @HttpCode(200)
    async CheckCode(@Body() body: codedto){
        return await this.SendEmailSerive.checkcode(body)
    }

    @Patch('new-password')
    async SetNewPassword(@Body() body: setnewpasswordto){
        return await this.UsersService.SetNewPassword(body)
    }

}
