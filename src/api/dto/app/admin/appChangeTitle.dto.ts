import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangeTitleAppDto {
  @ApiProperty()
  @IsString()
  readonly title: string;
}
