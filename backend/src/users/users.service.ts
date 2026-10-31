import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity.js';
import { createdto } from './users.dto.js';
import bcrypt from 'bcrypt';
import { logindto } from './users.logindto.js';
import { findeamildto } from './users.find-email-for-recovery-dto.js';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>){}

    async CreateUser(body: createdto){
        const exists = await this.userRepository.findOneBy({email: body.email})

        if(exists){
            throw new ConflictException('Этот email уже используется')
        }

        const passwordHash = await bcrypt.hash(body.password, 10);

        const User = this.userRepository.create({
            name: body.name,
            email: body.email,
            password: passwordHash,
            accept: body.accept,
        }); 
        const saved = await this.userRepository.save(User);
        return { id: saved.id, name: saved.name}
    }           
    
    async findUser(body: logindto){
        const user = await this.userRepository.findOneBy({email: body.email})

        if(!user || !(await bcrypt.compare(body.password, user.password)))
            throw new UnauthorizedException('Неверный email или пароль');
        return {id: user.id, name: user.name}
    }

    async findemail(body: findeamildto){
        const email = await this.userRepository.findOneBy({email:body.email})
            if(!email) throw new ConflictException('email не найден')
            //здесь потом сделаем отправку письма
    }

}
