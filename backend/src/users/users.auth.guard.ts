import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { SESSION_COOKIE_NAME} from "./constants/users.const.js";
import { SessionServce } from "./users.session.service.js";

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private readonly SessionService: SessionServce){}
    async canActivate(context: ExecutionContext):Promise<boolean>{
        const request = context.switchToHttp().getRequest();
        const token = request.cookies[SESSION_COOKIE_NAME]
        if(!token) 
            throw new UnauthorizedException
        else{
            const session = await this.SessionService.findUserId(token)
            if(!session) throw new UnauthorizedException
            request.userId = session
        }
        return true                         
    }
}