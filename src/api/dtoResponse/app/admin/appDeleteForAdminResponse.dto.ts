import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteAppForAdminResponseDto {
  @ApiProperty()
  @IsNumber()
  readonly id: number;

  @ApiProperty()
  @IsString()
  readonly title: string;

  constructor(partial: Partial<DeleteAppForAdminResponseDto>) {
    Object.assign(this, partial);
  }
}
