import { ConflictException, Injectable } from "@nestjs/common";
import nodemailer from "nodemailer";
import { InjectRepository } from "@nestjs/typeorm";
import { User, RecoveryPasswordCode } from "./users.entity.js";
import { Repository } from "typeorm";
import { findeamildto, codedto } from "./dto/users.find-email-for-recovery-dto.js";
import crypto from "node:crypto";
import bcrypt from 'bcrypt'
import { CODE_LIMIT_MS } from "./constants/users.const.js";


@Injectable()
export class SendemailService{
    constructor(@InjectRepository(User) private userRepository: Repository<User>,
     @InjectRepository(RecoveryPasswordCode) private RecoveryRepository: Repository<RecoveryPasswordCode>){}

    transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 465,
    secure: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
    });

    
    async SendEmail(body: findeamildto){
        const exist = await this.userRepository.findOneBy({email:body.email})
        const codetable = await this.RecoveryRepository.findOneBy({email: body.email})
        const now = () => Date.now()
        if(exist && codetable && (now() - codetable?.createTime.getTime()) <= CODE_LIMIT_MS ){
            const diffrens = now() - codetable.createTime.getTime()
            throw new ConflictException(`код уже отправлен и действителен еще ${Math.trunc((CODE_LIMIT_MS - diffrens) / 1000 / 60)}:${String(Math.trunc((CODE_LIMIT_MS - diffrens) / 1000 % 60)).padStart(2, "0")}`)
        }else if(exist && !codetable){
        const code = crypto.randomInt(0, 999999)
        const CodeHash = await bcrypt.hash(String(code), 10);
        const createTime = new Date()
        await this.RecoveryRepository.save({email: exist.email, code: CodeHash, createTime: createTime})
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to: body.email,
            text: `Код для востановления пароля от ${body.email} : ${code}`,
            subject: "Востановление пароля"
        })
        }else if(exist && codetable && (now() - codetable?.createTime.getTime()) >= CODE_LIMIT_MS){
            await this.RecoveryRepository.delete({email: body.email})
            const code = crypto.randomInt(0, 999999)
            const CodeHash = await bcrypt.hash(String(code), 10);
            const createTime = new Date()
            await this.RecoveryRepository.save({email: exist.email, code: CodeHash, createTime: createTime})
            await this.transporter.sendMail({
                from: process.env.SMTP_USER,
                to: body.email,
                text: `Код для востановления пароля от ${body.email} : ${code}`,
                subject: "Востановление пароля"
            })
        }
    }


    async checkcode(body: codedto){
        const getcode = await this.RecoveryRepository.findOneBy({email: body.email})
        const now = () => Date.now()
        const check = async () =>{
            if(!getcode) throw new ConflictException('ошибка попробуйте позже')
            else if(getcode && (now() - getcode.createTime.getTime()) <= CODE_LIMIT_MS) return await bcrypt.compare(body.code, getcode.code)
            else if(getcode && (now() - getcode.createTime.getTime()) >= CODE_LIMIT_MS) throw new ConflictException('код просрочен')
        }
        if(await check())
            return "success"
        else 
            return "не верный код"
        }

}

