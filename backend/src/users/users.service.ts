import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecoveryPasswordCode, User } from './users.entity.js';
import { createdto } from './dto/users.dto.js';
import bcrypt from 'bcrypt';
import { logindto } from './dto/users.logindto.js';
import { setnewpasswordto } from './dto/users.setnewpasswordto.js';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>,
         @InjectRepository(RecoveryPasswordCode) private RecoveryRepository: Repository<RecoveryPasswordCode>){}

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

    async SetNewPassword(body: setnewpasswordto){
        const user = await this.userRepository.findOneBy({email: body.email})
        const codefrombd = await this.RecoveryRepository.findOneBy({email: body.email})
        if(codefrombd?.code){
            if(user && await bcrypt.compare(body.code, codefrombd.code)){
                user.password = await bcrypt.hash(body.password, 10)
                await this.userRepository.save(user)
                return 'success'
            }else{
                return 'произошка ошибка попробуйте позже'
            }
        }else{
            return 'произошка ошибка попробуйте позже'
        }
    }
}
