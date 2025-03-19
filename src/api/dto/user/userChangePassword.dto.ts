import { IsString, IsEmail, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class Data {
  @ApiProperty()
  readonly question: string;

  @ApiProperty()
  readonly answer: string;
}

export class UserChangePasswordDto {
  @ApiProperty()
  @MinLength(6)
  @IsString()
  readonly password: string;

  @ApiProperty()
  @IsString()
  readonly appSecret: string;

  @ApiProperty({ type: () => Data })
  readonly data: Data;
}
