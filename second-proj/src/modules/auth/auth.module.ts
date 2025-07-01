import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy'

import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserModule } from '../users/user-modules';
@Module({
  imports: [
    JwtModule.register({
      secret: 'abcdefghijklmnopqrstuvwxyzabcdefghijkl',
      signOptions: { expiresIn: '1d' }

    }), UserModule
  ],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule { }
