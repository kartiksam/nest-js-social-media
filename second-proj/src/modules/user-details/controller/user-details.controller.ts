import { Controller, Delete, Get, Param, Post, Body, UseInterceptors, UploadedFile, Patch, Res } from "@nestjs/common";
import { UserDetailsService } from "../services/user-details.services";
import { ProfileDto } from "../dto/create-profile-dto";
import { ResponseProfileDto } from "../dto/Response-dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { v4 as uuidv4 } from 'uuid';
import { Observable, of } from "rxjs";
import path, { join } from "path";
import { Response } from 'express';

import { ApiBody, ApiConsumes, ApiOperation } from "@nestjs/swagger";


@Controller('Profile')
export class UserDetailsController {

    constructor(private readonly userService: UserDetailsService) { }
    // gym shoes shi chl r ah kiskiki dikkat bad me aajaye khi ghat vad gym cig chupchap er traine h ikalte ni h mehntibache
    // hide bock moodoff aise test kraye image upload
    @Post("/create")

    createProfile(@Body() dto: ProfileDto): Promise<ResponseProfileDto> {
        return this.userService.createProfile(dto);
    }

    @ApiOperation({ summary: 'Get all profiles' })

    @Get("/get")
    getAllData() {
        return this.userService.getAllData();
    }


    @ApiOperation({ summary: 'Get profile by userId' })

    @Get("/:id")
    getProfileByProfileId(@Param('id') id: string): Promise<ResponseProfileDto> {
        return this.userService.getDataById(id);
    }

    @Delete("/:id")
    async deleteProfileById(@Param('id') id: string): Promise<string> {
        return await this.userService.deleteByID(id);
    }

    @ApiOperation({ summary: 'Get profile by userId' })
    @Get("/:id/profile")
    getProfileByUserId(@Param('id') id: string): Promise<ResponseProfileDto> {
        return this.userService.getProfileByUserId(id);
    }

    @ApiOperation({ summary: 'Get profile image for a user' })
    @Get("profile-image/:imagename")
    findProfileImage(@Param('imagename') imagename: string, @Res() res: Response) {
        const imagePath = join(process.cwd(), 'avatars', imagename);
        return res.sendFile(imagePath);
    }


    @Patch(':id/upload-image')
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
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        description: 'Upload profile image',
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    @ApiOperation({ summary: 'Upload profile image for a user' })
    async uploadFile(@Param('id') id: string,
        @UploadedFile() file: Express.Multer.File): Promise<{ message: string }> {
        // uploaded file comes here 
        return await this.userService.uploadImage(id, file);

    }

    // authorziation
}



// beare token growth usko bhi le ana