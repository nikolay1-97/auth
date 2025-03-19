import { IsString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangeEmailAppAdminDto {
  @ApiProperty()
  @IsString()
  @IsEmail()
  readonly email: string;
}
