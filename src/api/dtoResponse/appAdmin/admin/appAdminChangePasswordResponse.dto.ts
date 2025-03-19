import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from '@nestjs/class-transformer';

export class ChangePasswordAppAdminResponseDto {
  @ApiProperty()
  @IsString()
  readonly message: string;

  constructor(partial: Partial<ChangePasswordAppAdminResponseDto>) {
    Object.assign(this, partial);
  }
}
