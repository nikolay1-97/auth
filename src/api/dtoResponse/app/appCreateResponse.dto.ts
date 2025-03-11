import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAppResponseDto {

  @ApiProperty()
  @IsString()
  readonly title: string;


  constructor(partial: Partial<CreateAppResponseDto>) {
    Object.assign(this, partial)
  }
}
