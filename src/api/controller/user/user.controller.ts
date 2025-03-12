import {
    Controller,
    UseInterceptors,
    SerializeOptions,
    ClassSerializerInterceptor,
    Post,
    Get,
    Patch,
    Body,
    Param,
    Req,
    ParseIntPipe,
    BadRequestException,
    UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { CreateUserDto } from 'src/api/dto/user/userCreate.dto';
import { CreateUserResponseDto } from 'src/api/dtoResponse/user/userCreateResponse.dto';
import { ApiResponse } from '@nestjs/swagger';
import { LoginUserDto } from 'src/api/dto/user/userLogin.dto';
import { LoginUserResponseDto } from 'src/api/dtoResponse/user/userLoginResponse.dto';
import { UserChangePasswordDto } from 'src/api/dto/user/userChangePassword.dto'; 
import { ChangePasswordResponseDto } from 'src/api/dtoResponse/user/userChangePasswordResponse.dto';
import { GetUsersByAppIdUserResponseDto } from 'src/api/dtoResponse/user/usersGetByAppIdResponse.dto';
import { UserGuard } from 'src/api/guards/user/user.guards';
import { UserService } from 'src/api/service/user/user.service';
import { UserAuthService } from 'src/api/service/user/userAuth.service';
import { JwtService } from '@nestjs/jwt';



@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: UserAuthService,
    private readonly jwtService: JwtService,
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

  @UseGuards(UserGuard)
  @ApiResponse({ status: 200, type: ChangePasswordResponseDto })
  @Patch()
  async changePassword(
    @Body() dto: UserChangePasswordDto,
    @Req() request: Request,
  ): Promise<ChangePasswordResponseDto> {
    const token = request.headers.authorization
        if (token) {
            const payload = this.jwtService.decode(token.substring(7, token.length))
            const userId = payload.sub
            if (userId) {
                return await this.userService.changePassword(userId, dto)
            }
        }
        throw new BadRequestException('user not found')
  }

  @ApiResponse({ status: 200, type: [GetUsersByAppIdUserResponseDto] })
  @Get(':id')
  async getListByAppId(@Param('id', ParseIntPipe) id: number): Promise<GetUsersByAppIdUserResponseDto[] | undefined> {
    return await this.userService.getByAppId(id);
  }
}
