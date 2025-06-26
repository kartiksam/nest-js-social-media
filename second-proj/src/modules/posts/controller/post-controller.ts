import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { ResponsePostDto } from "../dto/response-dto";
import { CreatePostDto } from "../dto/create-post";
import { PostService } from "../services/post-services";

@ApiTags('posts')
@Controller('Posts')
export class PostController {

    constructor(private readonly postService: PostService) { }

    @Get("/get")
    @ApiOperation({ summary: 'Get all posts' })
    @ApiResponse({ status: 200, description: 'Returns list of posts' })
    getAllPosts() {
        return this.postService.getAllPosts();
    }

    @ApiOperation({ summary: 'create a new post' })
    @ApiResponse({ status: 201, description: 'Created a post' })
    @Post("/create")
    createPost(@Body() dto: CreatePostDto): Promise<ResponsePostDto> {
        return this.postService.createPost(dto);
    }


    @Get("/:id")
    getDataById(@Param('id') id: string) {
        return this.postService.getDataById(id);

    }

    @Delete("/:id")
    getDeleteById(@Param('id') id: string): Promise<string> {
        return this.postService.deleteById(id);
    }












































}