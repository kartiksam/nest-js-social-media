import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Address } from "./address-Schema";
import * as mongoose from "mongoose";

export type UserDetailsDocument = UserDetails & Document;

@Schema({ timestamps: true })
export class UserDetails {

    @Prop()
    address: Address;

    @Prop()
    contactNumber: number;

    @Prop()
    image?: string;


    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    createdBy?: string;


}

export const UserDetailsSchema = SchemaFactory.createForClass(UserDetails); 