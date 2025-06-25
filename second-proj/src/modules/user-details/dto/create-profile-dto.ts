import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";
import { Address } from "src/schema/address-Schema";

export class ProfileDto {

    @ApiProperty()
    address: Address;

    @ApiProperty()
    @IsNumber()
    contactNumber: number;

    @ApiProperty()
    @IsString()
    createdBy: string;



}