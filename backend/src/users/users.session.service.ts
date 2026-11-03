import { Response } from "express";
import cookieParser from "cookie-parser";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SessionCookie, User } from "./users.entity.js";
import { Repository } from "typeorm";
import crypto from 'node:crypto'
import  { SESSION_LIMIT_MS } from './constants/users.const.js'
import { setnewpasswordto } from "./dto/users.setnewpasswordto.js";
@Injectable()
export class SessionServce{
    constructor(@InjectRepository(SessionCookie) private SessionRepository: Repository<SessionCookie>){}

    async CreateSession(id: number) {
        const token = crypto.randomBytes(32).toString('hex')
        const userSession = await this.SessionRepository.findOneBy({userId: id})
        const expiresAt = new Date(SESSION_LIMIT_MS + new Date().getTime())
        await this.SessionRepository.save({userId: id, token: token, expiresAt: expiresAt})
        return token
    }

    async findUserId(token: string){
        const sesson = await this.SessionRepository.findOneBy({token: token})
        const now = () => Date.now()
        if(!sesson) return null
        else if(now() >= sesson.expiresAt.getTime()) return null
        return sesson
    }

    async removeAllSessions(userId: number){
        await this.SessionRepository.delete({userId: userId})
        return 'success'
    }
    
    async removeSession(token: string){
        const session = await this.SessionRepository.findOneBy({token: token})
        if(session)
            await this.SessionRepository.delete({token: session.token})
        return null
    }
    
}

