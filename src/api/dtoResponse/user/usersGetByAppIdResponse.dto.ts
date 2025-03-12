import { IsString, IsEmail, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class GetUsersByAppIdUserResponseDto {
  @ApiProperty()
  @IsNumber()
  readonly id: number;

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


  constructor(partial: Partial<GetUsersByAppIdUserResponseDto>) {
    Object.assign(this, partial)
  }
}
