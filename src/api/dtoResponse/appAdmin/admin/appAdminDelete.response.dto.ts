import { IsString, IsEmail, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from '@nestjs/class-transformer';

export class DeleteAppAdminResponseDto {
  @ApiProperty()
  @IsNumber()
  readonly id: number;

  @ApiProperty()
  @IsString()
  @IsEmail()
  readonly email: string;

  @Exclude()
  password: string;

  constructor(partial: Partial<DeleteAppAdminResponseDto>) {
    Object.assign(this, partial)
  }
}
