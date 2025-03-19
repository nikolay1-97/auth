import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordResponseDto {
  @ApiProperty()
  @IsString()
  readonly message: string;

  constructor(partial: Partial<ChangePasswordResponseDto>) {
    Object.assign(this, partial);
  }
}
