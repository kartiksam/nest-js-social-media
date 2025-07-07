import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from "jsonwebtoken";
import { UserService } from '../users/services/user.service';
import { LoginDto } from './dto/loginDto';
import { RegisterDto } from './dto/registerDto';
import * as bcrypt from 'bcrypt';
import { LoginLogService } from '../login-logmodule/login-logmodule.service';
import { Request } from 'express';



@Injectable()
export class AuthService {
    constructor(private userService: UserService, private readonly loginLogService: LoginLogService,) { }

    private SECRET_KEY = "jhkjhfdkjhjhgjgfjgjgfjgdjhbfdghfhgjkhdfghdkjfghsdghdjkfghjkdfhjkghkjgf";

    async validateUser(dto: LoginDto, req: Request): Promise<any> {
        const { email, password } = dto;

        // Lookup user by email
        const user = await this.userService.findByEmail(email);

        const ipAddress = req.ip || req.connection.remoteAddress;
        const userAgent = req.headers['user-agent'] || 'unknown';

        // Case 1: User not found
        if (!user) {
            await this.loginLogService.logLogin({
                userId: 'unknown',
                ipAddress,
                userAgent,
                loginStatus: 'failed',
            });

            throw new UnauthorizedException('User not found');
        }

        // Case 2: Password invalid
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            await this.loginLogService.logLogin({
                userId: user._id.toString(),
                ipAddress,
                userAgent,
                loginStatus: 'failed',
            });

            throw new UnauthorizedException('Invalid credentials');
        }

        // Case 3: Login successful
        await this.loginLogService.logLogin({
            userId: user._id.toString(),
            ipAddress,
            userAgent,
            loginStatus: 'success',
        });

        // Remove password before returning
        const { password: _, ...userWithoutPassword } = user.toObject?.() || user;
        return userWithoutPassword;
    }


    generateToken(user: any): string {
        const plainUser = user.toObject?.() || user._doc || user;
        console.log(plainUser);
        const payload = { id: plainUser._id, email: plainUser.email, role: plainUser.role };
        console.log('Token payload:', payload); // Optional

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
