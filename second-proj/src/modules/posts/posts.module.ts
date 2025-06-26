import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Posts, PostsSchema } from 'src/schema/post-user';
import { PostController } from './controller/post-controller';
import { PostService } from './services/post-services';

@Module({

    imports: [MongooseModule.forFeature([{ name: Posts.name, schema: PostsSchema }])],
    controllers: [PostController],
    providers: [PostService],
})
export class PostsModule { }
