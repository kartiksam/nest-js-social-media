import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from "jsonwebtoken";
import { UserService } from '../users/services/user.service';
import { LoginDto } from './dto/loginDto';
import { RegisterDto } from './dto/registerDto';
import * as bcrypt from 'bcrypt';



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
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const { password: _, ...userWithoutPassword } = user;
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
