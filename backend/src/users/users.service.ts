import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecoveryPasswordCode, User } from './users.entity.js';
import { createdto } from './dto/users.dto.js';
import bcrypt from 'bcrypt';
import { logindto } from './dto/users.logindto.js';
import { setnewpasswordto } from './dto/users.setnewpasswordto.js';
import { CODE_LIMIT_MS } from './constants/users.const.js';
import { SessionServce } from './users.session.service.js';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>,
         @InjectRepository(RecoveryPasswordCode) private RecoveryRepository: Repository<RecoveryPasswordCode>,
        private readonly SessionService: SessionServce){}

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
        return {id: user.id, name: user.name, email: user.email}
    }

    async findUserById(id: number): Promise<{id: number, name: string; email: string }> {
        const user = await this.userRepository.findOneBy({id: id})
        if(!user)
            throw new NotFoundException()
        return { id: user.id, name: user.name, email: user.email }
    }

    async SetNewPassword(body: setnewpasswordto){
        const user = await this.userRepository.findOneBy({email: body.email})
        const codefrombd = await this.RecoveryRepository.findOneBy({email: body.email})
        const now = () => Date.now()
        if(user && codefrombd && (now() - codefrombd?.createTime.getTime()) <= CODE_LIMIT_MS ){
            if(await bcrypt.compare(body.code, codefrombd.code)){
                user.password = await bcrypt.hash(body.password, 10)
                await this.userRepository.save(user)
                await this.RecoveryRepository.delete({email: user.email})
                await this.SessionService.removeAllSessions(user.id)
                return 'success'
            }else throw new ConflictException('ошибка кода')
        }else{
            return 'произошка ошибка попробуйте позже'
        }
    }
}
