import { IsString, IsEmail, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class Data {
  @ApiProperty()
  readonly question: string;

  @ApiProperty()
  readonly answer: string;
}

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

export class CreateUserDto {
  @ApiProperty({ type: () => Credentials })
  readonly credentials: Credentials;

  @ApiProperty({ type: () => Data })
  readonly data: Data;

  @ApiProperty()
  readonly secret: string;
}
