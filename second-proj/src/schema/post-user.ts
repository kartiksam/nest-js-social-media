import { Prop, Schema } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
@Schema({ timestamps: true })
export class PostSchema {

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