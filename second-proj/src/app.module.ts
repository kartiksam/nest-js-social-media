import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/users/user-modules';
import { DatabaseModule } from './modules/users/database/database-module';
import { UserDetailsModule } from './modules/user-details/user-details.module';
import { PostsModule } from './modules/posts/posts.module';
import { CommentsModule } from './modules/comments/comments.module';
import { AuthModule } from './modules/auth/auth.module';
import { GuardModule } from './guard/guard.module';

@Module({
  imports: [UserModule, DatabaseModule, UserDetailsModule, PostsModule, CommentsModule, AuthModule, GuardModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
