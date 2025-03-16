import { IsString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangeEmailAppAdminResponseDto {

  @ApiProperty()
  @IsString()
  @IsEmail()
  readonly email: string;

  constructor(partial: Partial<ChangeEmailAppAdminResponseDto>) {
    Object.assign(this, partial)
  }
}
