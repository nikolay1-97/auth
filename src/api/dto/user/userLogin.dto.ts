import { IsString, IsEmail, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class Credentials {
  @ApiProperty()
  @IsString()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @MinLength(6)
  @IsString()
  readonly password: string;
}

export class LoginUserDto {
  @ApiProperty({ type: () => Credentials })
  readonly credentials: Credentials;

  @ApiProperty()
  @IsString()
  readonly appSecret: string;
}
