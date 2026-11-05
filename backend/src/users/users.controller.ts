import { Body, Controller, Get, HttpCode, NotFoundException, Patch, Post, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { createdto } from './dto/users.dto.js';
import { logindto } from './dto/users.logindto.js';
import { SendemailService } from './users.sendletter.service.js';
import { codedto, findeamildto } from './dto/users.find-email-for-recovery-dto.js';
import { setnewpasswordto } from './dto/users.setnewpasswordto.js';
import { AuthGuard } from './users.auth.guard.js';
import { SessionServce } from './users.session.service.js';
import type { Response, Request } from 'express';
import { SESSION_COOKIE_NAME, SESSION_LIMIT_MS } from './constants/users.const.js';
import 'express'

declare global {
    namespace Express {
        interface Request {
            userId?: number;
        }
    }
}

@Controller('users')
export class UsersController {
    constructor(private readonly UsersService: UsersService, private readonly SendEmailSerive: SendemailService, private readonly SessionServise: SessionServce){}
    @Post('reg')
    CreateUser(@Body() body: createdto){
        return this.UsersService.CreateUser(body);
    }

    
    @Post('login')
    @HttpCode(200)
    async Login(@Body() body: logindto, @Res({ passthrough: true }) res: Response){
        const user = await this.UsersService.findUser(body)
        const token = await this.SessionServise.CreateSession(user.id)
        res.cookie(SESSION_COOKIE_NAME, token, {
            httpOnly: true,
            sameSite: 'lax',
            expires: new Date(Date.now() + SESSION_LIMIT_MS)
        })
        return user
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

    @Post('auntification')
    @UseGuards(AuthGuard)
    async GetPersonalAccount(@Req() req: Request){
        const UserId = req.userId
        if(!UserId) throw new UnauthorizedException();
        const user = await this.UsersService.findUserById(UserId)
        if(!user) throw new NotFoundException('Пользователь не найден')
        return {name: user.name, email: user.email}
    }

    @Post('logout')
    @UseGuards(AuthGuard)
    async RemoveSession(@Req() req: Request, @Res({ passthrough: true }) res: Response){
        await this.SessionServise.removeSession(req.cookies[SESSION_COOKIE_NAME])
        res.cookie(SESSION_COOKIE_NAME, '',{
            httpOnly: true,
            sameSite: 'lax',
            expires: new Date(0)
        })
        return true 
    }

}
