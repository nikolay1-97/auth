import { IsString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangeEmailUserDto {
  @ApiProperty()
  @IsString()
  @IsEmail()
  readonly email: string;
}
