import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangeTitleAppResponseDto {
  @ApiProperty()
  @IsString()
  readonly title: string;

  constructor(partial: Partial<ChangeTitleAppResponseDto>) {
    Object.assign(this, partial);
  }
}
