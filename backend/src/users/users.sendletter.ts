import { Injectable } from "@nestjs/common";
import nodemailer from "nodemailer";
import { InjectRepository } from "@nestjs/typeorm";
import { User, RecoveryPasswordCode } from "./users.entity.js";
import { Repository } from "typeorm";
import { findeamildto, codedto } from "./dto/users.find-email-for-recovery-dto.js";
import crypto from "node:crypto";
import bcrypt from 'bcrypt'

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

    async findemail(body: findeamildto){
        return await this.userRepository.findOneBy({email:body.email})
    }

    async SendEmail(body: findeamildto){
        if(await this.findemail(body)){
            const code = crypto.randomInt(0, 999999)
            const CodeHash = await bcrypt.hash(String(code), 10);
            const enxist = await this.RecoveryRepository.findOneBy({email:body.email})
            if(enxist){
                enxist.code = CodeHash
                await this.RecoveryRepository.save(enxist)
            }
            else
                await this.RecoveryRepository.save({code: CodeHash, email: body.email})
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
        const check = async () =>{
            if(getcode) return await bcrypt.compare(body.code, getcode.code)
        }
        if(await check())
            return "success"
        else 
            return "не верный код"
    }
}

