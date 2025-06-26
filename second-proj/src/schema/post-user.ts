import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";


export type PostDocument = Posts & Document;
@Schema({ timestamps: true })
export class Posts {

    @Prop()
    title: string;

    @Prop()
    description: string;

    @Prop()
    likesCount: number;

    @Prop({
        type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true
    })
    createdBy: string;
}
export const PostsSchema = SchemaFactory.createForClass(Posts);