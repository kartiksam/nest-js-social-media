import { Body, Controller, Post, Get, Param, Delete } from "@nestjs/common";
import { UserDto } from "../dto/create-user-dto";
import { ResponseUserDto } from "../dto/Response-user-dto";
import { UserService } from "../services/user.service";
import { ApiResponse } from "@nestjs/swagger";
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UserController {

    constructor(private readonly userService: UserService) { }

    @ApiResponse({
        status: 201, description: "User Created", type: ResponseUserDto
    })
    @Post("/create")
    createUser(@Body() createUserDto: UserDto): Promise<ResponseUserDto> {
        return this.userService.create(createUserDto);
    }

    @Get("/get")
    getData() {
        return this.userService.getData();
    }

    @Get("/:id")
    getDataById(@Param('id') id: string): Promise<ResponseUserDto> {
        return this.userService.getDataById(id);
    }

    @Delete("/:id")
    async deleteById(@Param('id') id: string): Promise<string> {
        await this.userService.deleteById(id);
        return "Deleted Succesfully";
    }



}
