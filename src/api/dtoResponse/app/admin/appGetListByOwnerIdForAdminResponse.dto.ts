import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class GetListAppByOwnerIdForAdminResponseDto {

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


  constructor(partial: Partial<GetListAppByOwnerIdForAdminResponseDto>) {
    Object.assign(this, partial)
  }
}
