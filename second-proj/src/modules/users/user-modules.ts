import { Module } from "@nestjs/common";
import { UserController } from "./controller/user.controller";
import { UserService } from "./services/user.service";
import { User, UserSchema } from "../../schema/user.Schema";


import { MongooseModule } from "@nestjs/mongoose";
@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService]
})

export class UserModule { }