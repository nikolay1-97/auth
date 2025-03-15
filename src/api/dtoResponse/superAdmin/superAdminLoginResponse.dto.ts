import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginSuperAdminResponseDto {

  @ApiProperty()
  @IsString()
  readonly access_token: string;

  constructor(partial: Partial<LoginSuperAdminResponseDto>) {
    Object.assign(this, partial)
  }
}
