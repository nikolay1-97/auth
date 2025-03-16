import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Body,
    Req,
    Param,
    ParseIntPipe,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { AppsService } from 'src/api/service/app/app.service';
import { AppAdminService } from 'src/api/service/appAdmin/appAdmin.service';
import { ChangeTitleAppDto } from 'src/api/dto/app/admin/appChangeTitle.dto';
import { ChangeTitleAppResponseDto } from 'src/api/dtoResponse/app/admin/appChangeTitleResponse.dto';
import { DeleteAppForAdminResponseDto } from 'src/api/dtoResponse/app/admin/appDeleteForAdminResponse.dto';
import { GetListAppByOwnerIdForAdminResponseDto } from 'src/api/dtoResponse/app/admin/appGetListByOwnerIdForAdminResponse.dto';


@Controller('super-admin-app')
export class ManageAppsController {
    constructor(
        private readonly appService: AppsService,
        private readonly appAdminService: AppAdminService,
     ) {}

    @ApiResponse({ status: 200, type: ChangeTitleAppResponseDto })
    @Patch('app/:id')
    async changeTitle(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: ChangeTitleAppDto
    ): Promise<ChangeTitleAppResponseDto> {
        return await this.appService.changeTitle(id, dto)
            
    }

    @ApiResponse({ status: 200, type: DeleteAppForAdminResponseDto })
    @Delete('app/:id')
    async delete(
      @Param('id', ParseIntPipe) id: number,
    ): Promise<DeleteAppForAdminResponseDto> {
        return await this.appService.deleteForAdmin(id);
    }

    @ApiResponse({ status: 200, type: [GetListAppByOwnerIdForAdminResponseDto] })
    @Get('apps/:owner_id')
    async getListByAppId(@Param('owner_id', ParseIntPipe) owner_id: number): Promise<GetListAppByOwnerIdForAdminResponseDto[]> {
        return await this.appService.getByOwnerIdForAdmin(owner_id);
    }

}
