import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteUserRoleResponseDto {
  @ApiProperty()
  @IsNumber()
  readonly user_id: number;

  @ApiProperty()
  @IsNumber()
  readonly role_id: number;

  constructor(partial: Partial<DeleteUserRoleResponseDto>) {
    Object.assign(this, partial);
  }
}
