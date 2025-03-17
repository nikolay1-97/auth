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
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserRoleDto } from 'src/api/dto/userRole/userRoleCreate.dto';
import { CreateUserRoleResponseDto } from 'src/api/dtoResponse/userRole/userRoleCreateResponse.dto';
import { UserRoleService } from 'src/api/service/userRole/userRole.service.dto';
import { DeleteUserRoleResponseDto } from 'src/api/dtoResponse/userRole/userRoleDeleteResponse.dto';
import { GetUserRolesResponseDto } from 'src/api/dtoResponse/userRole/getUserRoles.dto';

@ApiTags('AppAdmin')
@Controller('userRoles')
export class UserRoleController {
    constructor(
        private readonly userRoleService: UserRoleService,
     ) {}

    @ApiResponse({ status: 200, type: CreateUserRoleResponseDto })
    @Post('create')
    async register(@Body() dto: CreateUserRoleDto) {
        return await this.userRoleService.create(dto)
    }

    @ApiResponse({ status: 200, type: DeleteUserRoleResponseDto })
    @Delete('/users/:user_id/roles/:role_id')
    async delete(
        @Param('user_id', ParseIntPipe) user_id: number,
        @Param('role_id', ParseIntPipe) role_id: number
        ): Promise<DeleteUserRoleResponseDto> {
            return await this.userRoleService.delete(user_id, role_id);
        }

    @ApiResponse({ status: 200, type: [GetUserRolesResponseDto] })
    @Get(':user_id')
    async getUseRoles(
      @Param('user_id', ParseIntPipe) user_id: number,
    ): Promise<GetUserRolesResponseDto[]> {
      return await this.userRoleService.getUserRoles(user_id);
    }


}
