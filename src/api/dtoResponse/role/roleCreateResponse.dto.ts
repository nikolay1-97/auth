import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleResponseDto {

  @ApiProperty()
  @IsString()
  readonly title: string;

  @ApiProperty()
  @IsNumber()
  readonly app_id: number;


  constructor(partial: Partial<CreateRoleResponseDto>) {
    Object.assign(this, partial)
  }
}
