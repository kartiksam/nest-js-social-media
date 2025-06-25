import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { UserDetails, UserDetailsDocument } from "src/schema/user-Details";
import { Model } from "mongoose";
@Injectable()
export class UserDetailsService {

    constructor(@InjectModel(UserDetails.name) private profileModel: Model<UserDetailsDocument>) { }

    
}