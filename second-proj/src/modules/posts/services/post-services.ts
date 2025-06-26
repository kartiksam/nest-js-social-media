import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PostDocument, Posts } from "src/schema/post-user";
import { Model } from "mongoose";
import { CreatePostDto } from "../dto/create-post";
import { ResponseProfileDto } from "src/modules/user-details/dto/Response-dto";
import { toResponsePostDto } from "src/utils/post-mapper";
import { ResponsePostDto } from "../dto/response-dto";

@Injectable()
export class PostService {


    constructor(@InjectModel(Posts.name) private postModel: Model<PostDocument>) { }

    async createPost(dto: CreatePostDto): Promise<ResponsePostDto> {
        const { title, description, likesCount, createdBy } = dto;
        const post = new this.postModel({
            title, description, likesCount, createdBy
        });
        await post.save();
        return toResponsePostDto(post);
    }


    async getAllPosts(): Promise<ResponsePostDto[]> {
        const posts = this.postModel.find().exec();
        return (await posts).map(post => toResponsePostDto(post));
    }

    async getDataById(id: string): Promise<ResponsePostDto> {
        const post = this.postModel.findById(id).exec();
        if (!post) {
            throw new NotFoundException("Not exists with given id");
        }
        return await toResponsePostDto(post);
    }


    async deleteById(id: string): Promise<string> {
        await this.postModel.findOneAndDelete({ _id: id }).exec();
        return `Given provided id ${id} is deleted succesfully`;
    }


}