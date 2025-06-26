import { Module } from '@nestjs/common';
import { CommentsController } from './controller/comments.controller';
import { CommentsService } from './services/comments.services';
import { MongooseModule } from '@nestjs/mongoose';
import { Comments, CommentsSchema } from 'src/schema/comments-user';

@Module({

    imports: [MongooseModule.forFeature([{ name: Comments.name, schema: CommentsSchema }])],
    controllers: [CommentsController],
    providers: [CommentsService]
})
export class CommentsModule { }
