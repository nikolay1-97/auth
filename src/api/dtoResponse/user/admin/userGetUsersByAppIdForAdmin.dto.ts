import { IsString, IsEmail, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class GetUsersByAppIdForAdminResponseDto {
  @ApiProperty()
  @IsNumber()
  readonly id: number;

  @ApiProperty()
  @IsNumber()
  readonly app_id: number;

  @ApiProperty()
  @IsString()
  @IsEmail()
  readonly email: string;

  @Exclude()
  password: string;

  @Exclude()
  data: string;

  @ApiProperty()
  @IsString()
  readonly created_at: string;

  @ApiProperty()
  @IsString()
  readonly updated_at: string;

  constructor(partial: Partial<GetUsersByAppIdForAdminResponseDto>) {
    Object.assign(this, partial);
  }
}
