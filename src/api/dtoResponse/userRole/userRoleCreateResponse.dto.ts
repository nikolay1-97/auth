import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserRoleResponseDto {
  @ApiProperty()
  @IsNumber()
  readonly user_id: number;

  @ApiProperty()
  @IsNumber()
  readonly role_id: number;

  constructor(partial: Partial<CreateUserRoleResponseDto>) {
    Object.assign(this, partial);
  }
}
