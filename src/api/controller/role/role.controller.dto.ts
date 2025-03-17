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
    UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateRoleDto } from 'src/api/dto/role/roleCreate.dto';
import { CreateRoleResponseDto } from 'src/api/dtoResponse/role/roleCreateResponse.dto';
import { RoleService } from 'src/api/service/role/role.service';
import { RoleChangeTitleDto } from 'src/api/dto/role/roleChangeTitle.dto';
import { RoleChangeTitleResponseDto } from 'src/api/dtoResponse/role/roleChangeTitleResponse.dto';
import { DeleteRoleResponseDto } from 'src/api/dtoResponse/role/roleDelete.dto';
import { RoleGetListByAppIdResponseDto } from 'src/api/dtoResponse/role/roleGetListByAppIdResponse.dto';
import { AppOwnerGuards } from 'src/api/guards/appAdmin/appOwner.guards';
import { RoleGuards } from 'src/api/guards/appAdmin/role.guards';


@ApiTags('AppAdmin')
@Controller('roles')
export class RoleController {
    constructor(
        private readonly roleService: RoleService,
     ) {}

    @ApiResponse({ status: 200, type: CreateRoleResponseDto })
    @Post('apps/:app_id/create')
    async register(@Body() dto: CreateRoleDto, @Param('app_id', ParseIntPipe) app_id: number,) {
        return await this.roleService.create(dto)
    }

    @UseGuards(RoleGuards)
    @ApiResponse({ status: 200, type: RoleChangeTitleResponseDto })
    @Patch('apps/:app_id/roles/:role_id')
    async changeTitle(
        @Param('app_id', ParseIntPipe) app_id: number,
        @Param('role_id', ParseIntPipe) role_id: number,
        @Body() dto: RoleChangeTitleDto
    ): Promise<RoleChangeTitleResponseDto> {
        return await this.roleService.changeTitle(role_id, dto)
            
    }

    @ApiResponse({ status: 200, type: DeleteRoleResponseDto })
    @Delete('apps/:app_id/role/:role_id')
    async delete(
    @Param('app_id', ParseIntPipe) app_id: number,
    @Param('role_id', ParseIntPipe) role_id: number,
    ): Promise<DeleteRoleResponseDto> {
        return await this.roleService.delete(role_id);
    }

    @UseGuards(AppOwnerGuards)
    @ApiResponse({ status: 200, type: [RoleGetListByAppIdResponseDto] })
    @Get(':app_id')
    async getListByAppId(
    @Param('app_id', ParseIntPipe) app_id: number,
    ): Promise<RoleGetListByAppIdResponseDto[]> {
        return await this.roleService.getListByAppId(app_id);
    }

}
