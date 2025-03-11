import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginAppAdminResponseDto {

  @ApiProperty()
  @IsString()
  readonly access_token: string;

  constructor(partial: Partial<LoginAppAdminResponseDto>) {
    Object.assign(this, partial)
  }
}
