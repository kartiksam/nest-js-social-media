import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModules } from './modules/users/user-modules';
import { DatabaseModule } from './modules/users/database/database-module';
import { UserDetailsModule } from './modules/user-details/user-details.module';
import { PostsModule } from './modules/posts/posts.module';

@Module({
  imports: [UsersModules, DatabaseModule, UserDetailsModule, PostsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
