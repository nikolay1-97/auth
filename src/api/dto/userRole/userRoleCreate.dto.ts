import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserRoleDto {
  @ApiProperty()
  @IsNumber()
  readonly user_id: number;

  @ApiProperty()
  @IsNumber()
  readonly role_id: number;
}
