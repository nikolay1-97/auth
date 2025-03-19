import { IsString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangeEmailUserResponseDto {
  @ApiProperty()
  @IsString()
  @IsEmail()
  readonly email: string;

  constructor(partial: Partial<ChangeEmailUserResponseDto>) {
    Object.assign(this, partial);
  }
}
