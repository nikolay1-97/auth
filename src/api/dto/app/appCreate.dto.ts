import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAppDto {
  @ApiProperty()
  @IsString()
  readonly title: string;

}
