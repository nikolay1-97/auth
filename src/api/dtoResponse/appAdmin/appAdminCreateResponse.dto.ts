import { IsString, IsEmail, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from '@nestjs/class-transformer';

export class CreateAppAdminResponseDto {

  @ApiProperty()
  @IsString()
  @IsEmail()
  readonly email: string;

  @Exclude()
  password: string;

  constructor(partial: Partial<CreateAppAdminResponseDto>) {
    Object.assign(this, partial)
  }
}
