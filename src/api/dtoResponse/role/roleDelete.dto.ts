import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteRoleResponseDto {
  @ApiProperty()
  @IsNumber()
  readonly id: number;

  @ApiProperty()
  @IsNumber()
  readonly app_id: number;

  @ApiProperty()
  @IsString()
  readonly title: string;

  constructor(partial: Partial<DeleteRoleResponseDto>) {
    Object.assign(this, partial);
  }
}
