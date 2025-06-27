import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CommentsService } from "../services/comments.services";
import { ApiTags } from "@nestjs/swagger";
import { createCommentsDto } from "../dtos/create-comment";
import { ResponseCommentDto } from "../dtos/Response-dto";


@ApiTags('Comments')
@Controller('Comments')
export class CommentsController {

    constructor(private readonly commentService: CommentsService) { }


    @Get("/get")
    getAllComments() {
        return this.commentService.getAllComments();
    }

    @Post("/create")
    createComment(@Body() dto: createCommentsDto): Promise<ResponseCommentDto> {
        return this.commentService.createComment(dto);
    }

    @Get("/:id")
    async getCommentById(@Param('id') id: string): Promise<ResponseCommentDto> {
        return await this.commentService.getCommentById(id);
    }
}