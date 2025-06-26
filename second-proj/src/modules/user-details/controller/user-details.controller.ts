import { Controller, Delete, Get, Param, Post, Body } from "@nestjs/common";
import { UserDetailsService } from "../services/user-details.services";
import { ProfileDto } from "../dto/create-profile-dto";
import { ResponseProfileDto } from "../dto/Response-dto";

@Controller('Profile')
export class UserDetailsController {

    constructor(private readonly userService: UserDetailsService) { }
    // gym shoes shi chl r ah kiskiki dikkat bad me aajaye khi ghat vad gym cig chupchap er traine h ikalte ni h mehntibache
    // hide bock moodoff aise test kraye image upload
    @Post("/create")

    createProfile(@Body() dto: ProfileDto): Promise<ResponseProfileDto> {
        return this.userService.createProfile(dto);
    }


    @Get("/get")
    getAllData() {

        return this.userService.getAllData();

    }

    @Get("/:id")
    getProfileByProfileId(@Param('id') id: string): Promise<ResponseProfileDto> {
        return this.userService.getDataById(id);
    }

    @Delete("/:id")
    async deleteProfileById(@Param('id') id: string): Promise<string> {
        return await this.userService.deleteByID(id);
    }

    @Get("/:id/profile")
    getProfileByUserId(@Param('id') id: string): Promise<ResponseProfileDto> {
        return this.userService.getProfileByUserId(id);
    }
} 