import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from "jsonwebtoken";
import { UserService } from '../users/services/user.service';
import { LoginDto } from './dto/loginDto';
import { RegisterDto } from './dto/registerDto';
import { KartikAuth } from './auth';


@Injectable()
export class AuthService {
    constructor(private userService: UserService) { }

    private SECRET_KEY = "jhkjhfdkjhjhgjgfjgjgfjgdjhbfdghfhgjkhdfghdkjfghsdghdjkfghjkdfhjkghkjgf";

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
        return jwt.sign(payload, this.SECRET_KEY);
    }

    async verifyToken(token: string) {
        try {
            return jwt.verify(token, this.SECRET_KEY)
        }
        catch (err) {
            throw new UnauthorizedException('Invalid Token')
        }
    }

    async register(dto: RegisterDto) {
        return this.userService.create(dto);
    }

}
