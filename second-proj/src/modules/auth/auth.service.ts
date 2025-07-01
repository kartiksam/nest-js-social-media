import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/services/user.service';
import { LoginDto } from './dto/loginDto';
import { RegisterDto } from './dto/registerDto';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService, private userService: UserService) { }


    async validateUser(dto: LoginDto): Promise<any> {
        const { email, password } = dto;
        const user = await this.userService.findByEmail(email);
        if (!user) {
            throw new UnauthorizedException('User not found');
        }
        const { password: _, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }



    generateToken(user: any): string {
        const payload = { sub: user.id, email: user.email, role: user.role };
        return this.jwtService.sign(payload);
    }

    // verifyToken(token: string): any {
    //     try {
    //         return this.jwtService.verify(token);
    //     } catch (err) {
    //         throw new UnauthorizedException('Invalid or expired token');
    //     }
    // }

    async register(dto: RegisterDto) {
        return this.userService.create(dto);
    }

}
