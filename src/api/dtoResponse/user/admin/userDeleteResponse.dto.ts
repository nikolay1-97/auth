import { IsString, IsEmail, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from '@nestjs/class-transformer';

export class DeleteUserResponseDto {
  @ApiProperty()
  @IsNumber()
  readonly id: number;

  @ApiProperty()
  @IsString()
  @IsEmail()
  readonly email: string;

  @Exclude()
  password: string;

  constructor(partial: Partial<DeleteUserResponseDto>) {
    Object.assign(this, partial);
  }
}
