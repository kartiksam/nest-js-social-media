import { Body, Controller, Delete, Get, Param, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { v4 as uuidv4 } from 'uuid';

import { ResponsePostDto } from "../dto/response-dto";
import { CreatePostDto } from "../dto/create-post";
import { PostService } from "../services/post-services";
import { FileInterceptor } from "@nestjs/platform-express/multer";
import { diskStorage } from "multer";
import * as path from "path";

@ApiTags('posts')
@Controller('Posts')
export class PostController {

    constructor(private readonly postService: PostService) { }


    @Post("/create")
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './avatars',
            filename: (req, file, cb) => {
                const filename: string = path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
                const extension: string = path.parse(file.originalname).ext;
                cb(null, `${filename}${extension}`);
            }
        })
    }
    ))
    @ApiOperation({ summary: 'Create a post with optional image and tags' })
    @ApiResponse({ status: 201, type: ResponsePostDto })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                title: { type: 'string' },
                description: { type: 'string' },
                likesCount: { type: 'number' },
                createdBy: { type: 'string' },
                file: {
                    type: 'string',
                    format: 'binary'
                }
            }
        }
    })
    createPost(@Body() dto: CreatePostDto, @UploadedFile() file: Express.Multer.File): Promise<ResponsePostDto> {
        return this.postService.createPost(dto, file);

    }

    @Get("/get")
    @ApiOperation({ summary: 'Get all posts' })
    @ApiResponse({ status: 200, description: 'Returns list of posts' })
    getAllPosts() {
        return this.postService.getAllPosts();
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

