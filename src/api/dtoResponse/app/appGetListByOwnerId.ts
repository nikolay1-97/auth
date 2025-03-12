import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class GetListAppResponseDto {

  @ApiProperty()
  @IsString()
  readonly title: string;

  @ApiProperty()
  @IsString()
  readonly secret: string;

  @Exclude()
  owner_id: number

  @ApiProperty()
  @IsString()
  readonly created_at: string;

  @ApiProperty()
  @IsString()
  readonly updated_at: string;


  constructor(partial: Partial<GetListAppResponseDto>) {
    Object.assign(this, partial)
  }
}
