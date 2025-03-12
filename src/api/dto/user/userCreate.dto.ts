import { IsString, IsEmail, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class Data {
    @ApiProperty()
    readonly question: string;

    @ApiProperty()
    readonly answer: string;
}


export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @MinLength(6)
  @IsString()
  readonly password: string;

  @ApiProperty({ type: () => Data })
  readonly data: Data;

  @ApiProperty()
  readonly secret: string

}
