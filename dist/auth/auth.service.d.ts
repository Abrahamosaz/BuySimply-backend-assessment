import { LoginDto } from './dtos/login.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
export declare class AuthService {
    private readonly jwtService;
    private readonly userService;
    constructor(jwtService: JwtService, userService: UserService);
    login(loginDto: LoginDto): Promise<{
        access_token: string;
    }>;
}
