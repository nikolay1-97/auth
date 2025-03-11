import {
    Controller,
    UseInterceptors,
    SerializeOptions,
    ClassSerializerInterceptor,
    Post,
    Patch,
    Body,
    Req,
    Param,
    ParseIntPipe,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { SecretService } from 'src/feature-md/secret/secret.service';
import { AppsService } from 'src/api/service/app/app.service';
import { CreateAppDto } from 'src/api/dto/app/appCreate.dto';
import { CreateAppResponseDto } from 'src/api/dtoResponse/app/appCreateResponse.dto';
import { UpdateAppResponseDto } from 'src/api/dtoResponse/app/appUpdateResponse.dto';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';


@Controller('app')
export class AppsController {
    constructor(private readonly appService: AppsService,
        private readonly jwtService: JwtService,
     ) {}

    @ApiResponse({ status: 200, type: CreateAppResponseDto })
    @Post('register')
      async register(@Body() dto: CreateAppDto, @Req() request: Request) {
        const token = request.headers.authorization
        if (token) {
            const payload = this.jwtService.decode(token.substring(7, token.length))
            const appAdminId = payload.sub
            if (appAdminId) {
                await this.appService.create(appAdminId, dto)
                return new CreateAppResponseDto({title: dto.title})
            }
            
        }
      }

      @ApiResponse({ status: 200, type: UpdateAppResponseDto })
      @Patch(':id')
      async changeSecret(@Param('id', ParseIntPipe) id: number): Promise<UpdateAppResponseDto> {
        await this.appService.update(id)
        return new UpdateAppResponseDto({message: 'successfully updated'})
        
      }
}
