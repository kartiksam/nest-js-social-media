import { Body, Controller, Get, Post } from "@nestjs/common";
import { CommentsService } from "../services/comments.services";
import { ApiTags } from "@nestjs/swagger";
import { createCommentsDto } from "../dtos/create-comment";
import { ResponseCommentDto } from "../dtos/Response-dto";


@ApiTags('Comments')
@Controller('Comments')
export class CommentsController {

    constructor(private readonly commentService: CommentsService) { }


    @Get("/get")
    getAllComments(): string {
        return "All comments";
    }

    @Post("/create")
    createComment(@Body() dto: createCommentsDto): Promise<ResponseCommentDto> {
        return this.commentService.createComment(dto);
    }
}