import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetUserRolesResponseDto {

  @ApiProperty()
  @IsNumber()
  readonly id: number;

  @ApiProperty()
  @IsString()
  readonly title: string;


  constructor(partial: Partial<GetUserRolesResponseDto>) {
    Object.assign(this, partial)
  }
}
