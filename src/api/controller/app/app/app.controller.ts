import {
  Controller,
  UseInterceptors,
  SerializeOptions,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Req,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppsService } from 'src/api/service/app/app.service';
import { CreateAppDto } from 'src/api/dto/app/appCreate.dto';
import { CreateAppResponseDto } from 'src/api/dtoResponse/app/appCreateResponse.dto';
import { UpdateAppResponseDto } from 'src/api/dtoResponse/app/appUpdateResponse.dto';
import { GetListAppResponseDto } from 'src/api/dtoResponse/app/appGetListByOwnerId';
import { DeleteAppResponseDto } from 'src/api/dtoResponse/app/appDeleteResponse.dto';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { AppAdminGuard } from 'src/api/guards/appAdmin/appAdmin.guards';
import { AppOwnerGuards } from 'src/api/guards/appAdmin/appOwner.guards';

@UseGuards(AppAdminGuard)
@ApiTags('AppAdmin')
@Controller('apps')
export class AppsController {
  constructor(
    private readonly appService: AppsService,
    private readonly jwtService: JwtService,
  ) {}

  @ApiResponse({ status: 200, type: CreateAppResponseDto })
  @Post('register')
  async register(@Body() dto: CreateAppDto, @Req() request: Request) {
    const token = request.headers.authorization;
    if (token) {
      const payload = this.jwtService.decode(token.substring(7, token.length));
      const appAdminId = payload.sub;
      if (appAdminId) {
        await this.appService.create(appAdminId, dto);
        return new CreateAppResponseDto({ title: dto.title });
      }
    }
  }

  @UseGuards(AppOwnerGuards)
  @ApiResponse({ status: 200, type: UpdateAppResponseDto })
  @Patch(':app_id')
  async changeSecret(
    @Param('app_id', ParseIntPipe) app_id: number,
    @Req() request: Request,
  ): Promise<UpdateAppResponseDto> {
    await this.appService.update(app_id);
    return new UpdateAppResponseDto({ message: 'successfully updated' });
  }

  @ApiResponse({ status: 200, type: [GetListAppResponseDto] })
  @Get()
  async getListByOwnerId(
    @Req() request: Request,
  ): Promise<GetListAppResponseDto[] | undefined> {
    const token = request.headers.authorization;
    if (token) {
      const payload = this.jwtService.decode(token.substring(7, token.length));
      const ownerId = payload.sub;
      if (ownerId) {
        return await this.appService.getByOwnerId(ownerId);
      }
    }
  }

  @UseGuards(AppOwnerGuards)
  @ApiResponse({ status: 200, type: DeleteAppResponseDto })
  @Delete(':app_id')
  async delete(
    @Param('app_id', ParseIntPipe) app_id: number,
  ): Promise<DeleteAppResponseDto> {
    return await this.appService.delete(app_id);
  }
}
