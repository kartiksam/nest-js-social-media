import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { UserDto } from "../dto/create-user-dto";
import { ResponseUserDto } from "../dto/Response-user-dto";
import { InjectModel } from "@nestjs/mongoose";
import { UserDocument, User } from "../../../schema/user.Schema";
import { Model } from "mongoose";
import { toResponseDto } from "../../../utils/user-mapper";

@Injectable()
export class UserService {


    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

    async create(dto: UserDto): Promise<ResponseUserDto> {
        const { name, email, password } = dto;
        const existingUser = await this.userModel.findOne({ email });
        if (existingUser) {
            throw new ConflictException('User already exists');
        }

        const user = new this.userModel({
            name,
            email, password

        });
        await user.save();
        return toResponseDto(user);
    }


    async getData(): Promise<ResponseUserDto[]> {
        const users = this.userModel.find().exec();
        return (await users).map(user => toResponseDto(user));
    }


    async getDataById(id: string): Promise<ResponseUserDto> {
        const user = await this.userModel.findById(id).exec();
        if (!user) {
            throw new NotFoundException("No user found with this given id");
        }
        return toResponseDto(user);
    }

    async deleteById(id: string) {
        return await this.userModel.findOneAndDelete({ _id: id });
    }


    async findByEmail(email: string) {
        return await this.userModel.findOne({ email: email });
    }



}


