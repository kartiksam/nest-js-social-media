import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as moment from "moment";
import * as mongoose from "mongoose";

export type CommentsDocument = Comments & Document;

@Schema()
export class Comments {

    @Prop()
    message: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId })
    createdBy?: string;

    @Prop({ type: Number, default: moment().utc().valueOf() })
    created_at: number;

    @Prop({ type: Number, default: null })
    updated_at: number;







}
export const CommentsSchema = SchemaFactory.createForClass(Comments);