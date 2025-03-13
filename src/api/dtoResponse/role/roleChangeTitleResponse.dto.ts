import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RoleChangeTitleResponseDto {

  @ApiProperty()
  @IsString()
  readonly newTitle: string;

  constructor(partial: Partial<RoleChangeTitleResponseDto>) {
    Object.assign(this, partial)
  }
}
