import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAppResponseDto {

  @ApiProperty()
  @IsString()
  readonly message: string;


  constructor(partial: Partial<UpdateAppResponseDto>) {
    Object.assign(this, partial)
  }
}
