import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteAppResponseDto {
  @ApiProperty()
  @IsNumber()
  readonly id: number;

  @ApiProperty()
  @IsString()
  readonly title: string;

  constructor(partial: Partial<DeleteAppResponseDto>) {
    Object.assign(this, partial);
  }
}
