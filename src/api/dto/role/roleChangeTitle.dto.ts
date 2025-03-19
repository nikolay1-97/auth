import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RoleChangeTitleDto {
  @ApiProperty()
  @IsString()
  readonly title: string;
}
