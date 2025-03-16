import { MinLength, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordAppAdminDto {
  @ApiProperty()
  @MinLength(6)
  @IsString()
  readonly password: string;

}
