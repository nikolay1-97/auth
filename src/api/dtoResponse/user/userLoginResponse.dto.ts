import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserResponseDto {
  @ApiProperty()
  @IsString()
  readonly access_token: string;

  constructor(partial: Partial<LoginUserResponseDto>) {
    Object.assign(this, partial);
  }
}
