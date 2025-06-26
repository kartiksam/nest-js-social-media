import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Comments, CommentsDocument } from "src/schema/comments-user";
import { createCommentsDto } from "../dtos/create-comment";
import { ResponseCommentDto } from "../dtos/Response-dto";
import { toResponseCommentDto } from "src/utils/comments-mapper";

@Injectable()
export class CommentsService {

    constructor(@InjectModel(Comments.name) private commentModel: Model<CommentsDocument>) { }

    async createComment(dto: createCommentsDto): Promise<ResponseCommentDto> {
        const { message, createdBy } = dto;
        const comment = new this.commentModel({
            message, createdBy
        });
        await comment.save();
        return toResponseCommentDto(comment);
    }

}