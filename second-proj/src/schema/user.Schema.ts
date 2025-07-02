import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Role } from "src/enums/role";


export type UserDocument = User & Document;
@Schema({ timestamps: true })
export class User {

    @Prop()
    name: string;

    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop({ enum: Role, default: Role.USER })
    role: Role

    @Prop({ default: true })
    isActive: boolean;

    @Prop()
    deletedAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);