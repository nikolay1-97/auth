import {
    Controller,
    UseInterceptors,
    SerializeOptions,
    ClassSerializerInterceptor,
    Post,
    Body,
    BadRequestException,
} from '@nestjs/common';
import { CreateUserDto } from 'src/api/dto/user/userCreate.dto';
import { CreateUserResponseDto } from 'src/api/dtoResponse/user/userCreateResponse.dto';
import { ApiResponse } from '@nestjs/swagger';
import { LoginUserDto } from 'src/api/dto/user/userLogin.dto';
import { LoginUserResponseDto } from 'src/api/dtoResponse/user/userLoginResponse.dto'; 
import { UserService } from 'src/api/service/user/user.service';
import { UserAuthService } from 'src/api/service/user/userAuth.service';



@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: UserAuthService,
 ) {}

  @ApiResponse({ status: 201, type: CreateUserResponseDto })
  @Post('register')
  async register(
    @Body() dto: CreateUserDto,
  ): Promise<CreateUserResponseDto> {
    await this.userService.create({
      email: dto.email,
      password: dto.password,
      secret: dto.secret,
      data: dto.data,
    });
    return new CreateUserResponseDto({email: dto.email});
  }

  @ApiResponse({ status: 200, type: LoginUserResponseDto })
  @Post('login')
  async login(@Body() dto: LoginUserDto): Promise<LoginUserResponseDto> {
    const token = await this.authService.login(
        dto.email,
        dto.password,
        dto.secret,
    );
    if (token) {
      return new LoginUserResponseDto({access_token: token.access_token});
    }
    throw new BadRequestException('неверный логин или пароль');
  }
}
