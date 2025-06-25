import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
export type CommentsDocument = Comments & Document;

@Schema({ timestamps: true })
export class Comments {

    @Prop()
    message: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId })
    createdBy: string;


}
export const CommentsSchema = SchemaFactory.createForClass(Comments);