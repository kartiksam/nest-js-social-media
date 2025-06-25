import { Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { UserDetailsService } from "../services/user-details.services";
import { ProfileDto } from "../dto/create-profile-dto";

@Controller('Profile')
export class UserDetailsController {

    constructor(private readonly userService: UserDetailsService) { }


    @Post("/create")
    createProfile() {

    }


    @Get()
    getData() {

    }

    @Get("/:id")
    getProfileByProfileId(@Param('id') id: string) {

    }

    @Delete("/:id")
    deleteProfileById(@Param('id') id: string) {

    }
}