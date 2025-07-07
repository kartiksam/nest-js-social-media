import { ApiProperty } from "@nestjs/swagger";

export class logDto {

    @ApiProperty()
    userId: string;

    @ApiProperty({ required: false })
    ipAddress?: string;

    @ApiProperty({ required: false })
    userAgent?: string;

    @ApiProperty({ enum: ['success', 'failed'] })
    loginStatus?: 'success' | 'failed';

}