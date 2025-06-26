import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { UserDetails, UserDetailsDocument } from "src/schema/user-Details";
import { Model } from "mongoose";
import { ProfileDto } from "../dto/create-profile-dto";
import { ResponseProfileDto } from "../dto/Response-dto";
import { toResponseProfileDto } from "src/utils/Profile-mapper";
import { profile } from "console";
@Injectable()
export class UserDetailsService {

    constructor(@InjectModel(UserDetails.name) private profileModel: Model<UserDetailsDocument>) { }

    async createProfile(dto: ProfileDto): Promise<ResponseProfileDto> {
        const { address, contactNumber, createdBy } = dto;
        const profile = new this.profileModel({
            address, contactNumber, createdBy

        });
        await profile.save();
        return toResponseProfileDto(profile);
    }

    async getAllData(): Promise<ResponseProfileDto[]> {
        const profiles = this.profileModel.find().exec();
        return (await profiles).map(profile => toResponseProfileDto(profile));
    }

    async getDataById(id: string): Promise<ResponseProfileDto> {
        const profile = await this.profileModel.findById(id).exec();
        if (!profile) {
            throw new NotFoundException("No profile with this given id");
        }
        return toResponseProfileDto(profile);

    }

    async deleteByID(id: string): Promise<string> {
        await this.profileModel.findByIdAndDelete(id);
        return `Profile with provided id ${id} is deleted succesfully`;
    }

}