import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordUserResponseDto {

  @ApiProperty()
  @IsString()
  readonly message: string;

  constructor(partial: Partial<ChangePasswordUserResponseDto>) {
    Object.assign(this, partial)
  }
}
