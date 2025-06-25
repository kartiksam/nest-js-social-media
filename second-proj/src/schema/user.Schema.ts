import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


export type UserDocument = User & Document;
@Schema({ timestamps: true })
export class User {

    @Prop()
    name: string;

    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop({ default: true })
    isActive: boolean;

    @Prop()
    deletedAt?: Date;

}

export const UserSchema = SchemaFactory.createForClass(User);