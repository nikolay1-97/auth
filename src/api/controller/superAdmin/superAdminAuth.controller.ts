import {
    Controller,
    Post,
    Body,
    BadRequestException,
} from '@nestjs/common';
import { SuperAdminAuthService } from 'src/api/service/superAdmin/superAdminAuth.service';
import { LoginSuperAdminDto } from 'src/api/dto/superAdmin/superAdminLogin.dto';
import { LoginSuperAdminResponseDto } from 'src/api/dtoResponse/superAdmin/superAdminLoginResponse.dto';
import { ApiResponse } from '@nestjs/swagger';


@Controller('super-admin')
export class SuperAdminAuthController {
  constructor(
    private readonly superAdminAuthService: SuperAdminAuthService,
 ) {}

  @ApiResponse({ status: 200, type: LoginSuperAdminResponseDto })
  @Post('login')
  async login(@Body() dto: LoginSuperAdminDto): Promise<LoginSuperAdminResponseDto> {
    const token = await this.superAdminAuthService.login(dto.email, dto.password);
    if (token) {
      return new LoginSuperAdminResponseDto({access_token: token.access_token});
    }
    throw new BadRequestException('неверный логин или пароль');
  }
}
