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
import { CreateUserRoleDto } from 'src/api/dto/userRole/userRoleCreate.dto';
import { CreateUserRoleResponseDto } from 'src/api/dtoResponse/userRole/userRoleCreateResponse.dto';
import { UserRoleService } from 'src/api/service/userRole/userRole.service.dto';
import { DeleteUserRoleResponseDto } from 'src/api/dtoResponse/userRole/userRoleDeleteResponse.dto';
import { GetUserRolesResponseDto } from 'src/api/dtoResponse/userRole/getUserRoles.dto';
import { AppAdminGuard } from 'src/api/guards/appAdmin/appAdmin.guards';
import { UserRoleCreateGuards } from 'src/api/guards/appAdmin/userRoleCreate.guards';
import { AppOwnerGuards } from 'src/api/guards/appAdmin/appOwner.guards';

@ApiTags('AppAdmin')
@Controller('userRoles')
export class UserRoleController {
    constructor(
        private readonly userRoleService: UserRoleService,
     ) {}

    @ApiResponse({ status: 200, type: CreateUserRoleResponseDto })
    @UseGuards(AppAdminGuard, AppOwnerGuards, UserRoleCreateGuards)
    @Post('apps/:app_id/create')
    async register(@Body() dto: CreateUserRoleDto,
    @Param('app_id', ParseIntPipe) app_id: number,
) {
        return await this.userRoleService.create(dto)
    }

    @ApiResponse({ status: 200, type: DeleteUserRoleResponseDto })
    @Delete('apps/:app_id/users/:user_id/roles/:role_id')
    async delete(
        @Param('user_id', ParseIntPipe) user_id: number,
        @Param('role_id', ParseIntPipe) role_id: number,
        @Param('app_id', ParseIntPipe) app_id: number,
        ): Promise<DeleteUserRoleResponseDto> {
            return await this.userRoleService.delete(user_id, role_id);
        }

    @ApiResponse({ status: 200, type: [GetUserRolesResponseDto] })
    @Get('apps/:app_id/users/:user_id')
    async getUseRoles(
      @Param('app_id', ParseIntPipe) app_id: number,
      @Param('user_id', ParseIntPipe) user_id: number,
    ): Promise<GetUserRolesResponseDto[]> {
      return await this.userRoleService.getUserRoles(user_id);
    }

}
