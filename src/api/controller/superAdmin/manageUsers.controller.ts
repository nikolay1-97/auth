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
import { UserService } from 'src/api/service/user/user.service';
import { ChangeEmailUserDto } from 'src/api/dto/user/admin/userChangeEmail.dto';
import { ChangeEmailUserResponseDto } from 'src/api/dtoResponse/user/admin/userChangeEmailResponse.dto';
import { ChangePasswordUserDto } from 'src/api/dto/user/admin/userChangePassword.dto';
import { ChangePasswordUserResponseDto } from 'src/api/dtoResponse/user/admin/userChangePasswordResponse.dto';
import { DeleteUserResponseDto } from 'src/api/dtoResponse/user/admin/userDeleteResponse.dto';
import { GetUsersByAppIdUserResponseDto } from 'src/api/dtoResponse/user/usersGetByAppIdResponse.dto';
import { GetUsersByAppIdForAdminResponseDto } from 'src/api/dtoResponse/user/admin/userGetUsersByAppIdForAdmin.dto';


@Controller('super-admin-users')
export class ManageUsersController {
    constructor(
        private readonly userService: UserService,
     ) {}


    @ApiResponse({ status: 200, type: ChangeEmailUserResponseDto })
    @Patch('user/:id')
    async changeEmail(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: ChangeEmailUserDto
    ): Promise<ChangeEmailUserResponseDto> {
        return await this.userService.changeEmail(id, dto)
            
    }

    @ApiResponse({ status: 200, type: ChangePasswordUserResponseDto })
    @Patch('users/:id')
    async changePassword(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: ChangePasswordUserDto
    ): Promise<ChangePasswordUserResponseDto> {
        return await this.userService.changePasswordForAdmin(id, dto)
            
    }

    @ApiResponse({ status: 200, type: DeleteUserResponseDto })
    @Delete('user/:id')
    async delete(
      @Param('id', ParseIntPipe) id: number,
    ): Promise<DeleteUserResponseDto> {
        return await this.userService.delete(id);
    }

    @ApiResponse({ status: 200, type: [GetUsersByAppIdForAdminResponseDto] })
    @Get('users/:app_id')
    async getListByAppId(@Param('app_id', ParseIntPipe) app_id: number): Promise<GetUsersByAppIdUserResponseDto[] | undefined> {
      return await this.userService.getByAppIdForAdmin(app_id);
    }

}
