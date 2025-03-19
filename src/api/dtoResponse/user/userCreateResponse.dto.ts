import { IsString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from '@nestjs/class-transformer';

export class CreateUserResponseDto {
  @ApiProperty()
  @IsString()
  @IsEmail()
  readonly email: string;

  @Exclude()
  password: string;

  constructor(partial: Partial<CreateUserResponseDto>) {
    Object.assign(this, partial);
  }
}
