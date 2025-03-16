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
import { AppAdminService } from 'src/api/service/appAdmin/appAdmin.service';
import { ChangeEmailAppAdminDto } from 'src/api/dto/appAdmin/admin/appAdminChangeEmail.dto';
import { ChangeEmailAppAdminResponseDto } from 'src/api/dtoResponse/appAdmin/admin/appAdminChangeEmailResponse.dto';
import { ChangePasswordAppAdminDto } from 'src/api/dto/appAdmin/admin/appAdminChangePassword.dto';
import { ChangePasswordAppAdminResponseDto } from 'src/api/dtoResponse/appAdmin/admin/appAdminChangePasswordResponse.dto';
import { DeleteAppAdminResponseDto } from 'src/api/dtoResponse/appAdmin/admin/appAdminDelete.response.dto';
import { GetAppAdminsResponseDto } from 'src/api/dtoResponse/appAdmin/admin/appAdminGetList.dto';


@Controller('super-admin')
export class ManageAppAdminsController {
    constructor(
        private readonly appAdminService: AppAdminService,
     ) {}


    @ApiResponse({ status: 200, type: ChangeEmailAppAdminResponseDto })
    @Patch('app-admin/:appAdmin_id')
    async changeEmail(
        @Param('appAdmin_id', ParseIntPipe) appAdmin_id: number,
        @Body() dto: ChangeEmailAppAdminDto
    ): Promise<ChangeEmailAppAdminResponseDto> {
        return await this.appAdminService.changeEmail(appAdmin_id, dto)
            
    }

    @ApiResponse({ status: 200, type: ChangePasswordAppAdminResponseDto })
    @Patch('app-admins/:appAdmin_id')
    async changePassword(
        @Param('appAdmin_id', ParseIntPipe) appAdmin_id: number,
        @Body() dto: ChangePasswordAppAdminDto
    ): Promise<ChangePasswordAppAdminResponseDto> {
        return await this.appAdminService.changePassword(appAdmin_id, dto)
            
    }

    @ApiResponse({ status: 200, type: DeleteAppAdminResponseDto })
    @Delete('app-admin/:id')
    async delete(
      @Param('id', ParseIntPipe) id: number,
    ): Promise<DeleteAppAdminResponseDto> {
        return await this.appAdminService.delete(id);
    }

    @ApiResponse({ status: 200, type: [GetAppAdminsResponseDto] })
    @Get('app-admins')
    async getAppAdmins(): Promise<GetAppAdminsResponseDto[]> {
      return await this.appAdminService.getAppAdmins();
    }

}
