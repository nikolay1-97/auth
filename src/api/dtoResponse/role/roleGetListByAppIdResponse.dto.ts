import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RoleGetListByAppIdResponseDto {

  @ApiProperty()
  @IsNumber()
  readonly id: number;

  @ApiProperty()
  @IsNumber()
  readonly app_id: number;

  @ApiProperty()
  @IsString()
  readonly title: string;

  @ApiProperty()
  @IsString()
  readonly created_at: string;

  @ApiProperty()
  @IsString()
  readonly updated_at: string;



  constructor(partial: Partial<RoleGetListByAppIdResponseDto>) {
    Object.assign(this, partial)
  }
}
