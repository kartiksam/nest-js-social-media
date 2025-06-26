import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class createCommentsDto {

    @ApiProperty()
    @IsString()
    message: string;

    @ApiProperty()
    @IsString()
    createdBy: string;
}