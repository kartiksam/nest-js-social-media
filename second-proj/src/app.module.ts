import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModules } from './modules/users/user-modules';
import { DatabaseModule } from './modules/users/database/database-module';
import { UserDetailsModule } from './modules/user-details/user-details.module';

@Module({
  imports: [UsersModules, DatabaseModule, UserDetailsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
