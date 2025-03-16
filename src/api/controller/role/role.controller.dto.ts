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
import { CreateRoleDto } from 'src/api/dto/role/roleCreate.dto';
import { CreateRoleResponseDto } from 'src/api/dtoResponse/role/roleCreateResponse.dto';
import { RoleService } from 'src/api/service/role/role.service';
import { RoleChangeTitleDto } from 'src/api/dto/role/roleChangeTitle.dto';
import { RoleChangeTitleResponseDto } from 'src/api/dtoResponse/role/roleChangeTitleResponse.dto';
import { DeleteRoleResponseDto } from 'src/api/dtoResponse/role/roleDelete.dto';
import { RoleGetListByAppIdResponseDto } from 'src/api/dtoResponse/role/roleGetListByAppIdResponse.dto';


@Controller('roles')
export class RoleController {
    constructor(
        private readonly roleService: RoleService,
     ) {}

    @ApiResponse({ status: 200, type: CreateRoleResponseDto })
    @Post('create')
    async register(@Body() dto: CreateRoleDto) {
        return await this.roleService.create(dto)
    }

    @ApiResponse({ status: 200, type: RoleChangeTitleResponseDto })
    @Patch(':id')
    async changeTitle(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: RoleChangeTitleDto
    ): Promise<RoleChangeTitleResponseDto> {
        return await this.roleService.changeTitle(id, dto)
            
    }

    @ApiResponse({ status: 200, type: DeleteRoleResponseDto })
    @Delete(':id')
    async delete(
    @Param('id', ParseIntPipe) id: number,
    ): Promise<DeleteRoleResponseDto> {
        return await this.roleService.delete(id);
    }

    @ApiResponse({ status: 200, type: [RoleGetListByAppIdResponseDto] })
    @Get(':app_id')
    async getListByAppId(
    @Param('app_id', ParseIntPipe) app_id: number,
    ): Promise<RoleGetListByAppIdResponseDto[]> {
        return await this.roleService.getListByAppId(app_id);
    }

}
