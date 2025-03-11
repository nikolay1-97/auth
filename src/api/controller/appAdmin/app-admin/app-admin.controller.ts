import {
    Controller,
    UseInterceptors,
    SerializeOptions,
    ClassSerializerInterceptor,
    Post,
    Body,
} from '@nestjs/common';
import { AppAdminService } from 'src/api/service/appAdmin/appAdmin.service';
import { CreateAppAdminResponseDto } from 'src/api/dtoResponse/appAdmin/appAdminCreateResponse.dto';
import { CreateAppAdminDto } from 'src/api/dto/appAdmin/appAdminCreate.dto';
import { ApiResponse } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';


@Controller('app-admin')
export class AppAdminController {
  constructor(private readonly appAdminService: AppAdminService ) {}

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
    return new CreateAppAdminResponseDto({email: dto.email});
  }
}
