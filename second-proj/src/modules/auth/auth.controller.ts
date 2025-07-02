import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/loginDto';
import { RegisterDto } from './dto/registerDto';
import { KartikAuth } from './auth';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }
    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        const user = await this.authService.validateUser(loginDto);
        return this.authService.generateToken(user);
    }

    @Post('register')
    async register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }

    @Get('me')
    @UseGuards(KartikAuth)
    @ApiBearerAuth()
    getProfile(@Req() request: Request) {
        // This will return whatever you put in request['user'] in your guard
        return {
            message: 'Token payload attached to request',
            user: request['user'],
        };
    }
}
