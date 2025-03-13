import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty()
  @IsString()
  readonly title: string;

  @ApiProperty()
  @IsNumber()
  readonly app_id: number;
}
