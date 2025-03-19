import {
  Controller,
  UseInterceptors,
  SerializeOptions,
  ClassSerializerInterceptor,
  Post,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { AppAdminService } from 'src/api/service/appAdmin/appAdmin.service';
import { CreateAppAdminResponseDto } from 'src/api/dtoResponse/appAdmin/appAdminCreateResponse.dto';
import { CreateAppAdminDto } from 'src/api/dto/appAdmin/appAdminCreate.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginAppAdminDto } from 'src/api/dto/appAdmin/appAdminLogin.dto';
import { LoginAppAdminResponseDto } from 'src/api/dtoResponse/appAdmin/appAdminLoginResponse.dto';
import { AppAdminAuthService } from 'src/api/service/appAdmin/appAdminAuth.service';

@ApiTags('AppAdmin')
@Controller('app-admins')
export class AppAdminController {
  constructor(
    private readonly appAdminService: AppAdminService,
    private readonly appAdminAuthService: AppAdminAuthService,
  ) {}

  @ApiResponse({ status: 201, type: CreateAppAdminResponseDto })
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('register')
  async register(
    @Body() dto: CreateAppAdminDto,
  ): Promise<CreateAppAdminResponseDto> {
    await this.appAdminService.create({
      email: dto.email,
      password: dto.password,
    });
    return new CreateAppAdminResponseDto({ email: dto.email });
  }

  @ApiResponse({ status: 200, type: LoginAppAdminResponseDto })
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('login')
  async login(
    @Body() dto: LoginAppAdminDto,
  ): Promise<LoginAppAdminResponseDto> {
    const token = await this.appAdminAuthService.login(dto.email, dto.password);
    if (token) {
      return new LoginAppAdminResponseDto({ access_token: token.access_token });
    }
    throw new BadRequestException('неверный логин или пароль');
  }
}
