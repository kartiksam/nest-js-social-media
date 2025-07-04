import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { Address } from "src/schema/address-Schema";
import { AddressDto } from "./address-dto";

export class ProfileDto {
    @ApiProperty({ type: AddressDto })
    @ValidateNested()
    @Type(() => AddressDto)
    address: AddressDto;


    @ApiProperty()
    @IsNumber()
    contactNumber: number;

    @ApiProperty()
    @IsOptional()
    image: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    createdBy: string;



}