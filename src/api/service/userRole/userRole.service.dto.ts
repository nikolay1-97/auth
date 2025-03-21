import { Injectable, BadRequestException } from '@nestjs/common';
import { UserRoleRepository } from 'src/db/repositories/userRole/repository';
import { RoleRepository } from 'src/db/repositories/role/repository';
import { UserRepository } from 'src/db/repositories/user/repository';
import { CreateUserRoleDto } from 'src/api/dto/userRole/userRoleCreate.dto';
import { CreateUserRoleResponseDto } from 'src/api/dtoResponse/userRole/userRoleCreateResponse.dto';
import { DeleteUserRoleResponseDto } from 'src/api/dtoResponse/userRole/userRoleDeleteResponse.dto';
import { GetUserRolesResponseDto } from 'src/api/dtoResponse/userRole/getUserRoles.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UserRoleService {
  constructor(
    private readonly userRoleRepository: UserRoleRepository,
    private readonly roleRepository: RoleRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async create(dto: CreateUserRoleDto): Promise<CreateUserRoleResponseDto> {
    const userRole = await this.userRoleRepository.getRowByUserIdAndRoleId(
      dto.user_id,
      dto.role_id,
    );
    if (userRole) {
      throw new BadRequestException('row of userRole already exists');
    }

    await this.userRoleRepository.create(dto);
    return new CreateUserRoleResponseDto({
      user_id: dto.user_id,
      role_id: dto.role_id,
    });
  }

  async delete(
    user_id: number,
    role_id: number,
  ): Promise<DeleteUserRoleResponseDto> {
    const user = await this.userRepository.getById(user_id);

    if (!user) {
      throw new BadRequestException('user not found');
    }

    const role = await this.roleRepository.getById(role_id);

    if (!role) {
      throw new BadRequestException('role not found');
    }

    const userRole = await this.userRoleRepository.getRowByUserIdAndRoleId(
      user_id,
      role_id,
    );
    if (!userRole) {
      throw new BadRequestException('row of userRole not found');
    }

    await this.userRoleRepository.delete(user_id, role_id);
    return new DeleteUserRoleResponseDto({
      user_id: user.id,
      role_id: role.id,
    });
  }

  async getUserRoles(user_id: number): Promise<GetUserRolesResponseDto[]> {
    const userRoles = await this.userRoleRepository.getUserRoles(user_id);

    return plainToInstance(GetUserRolesResponseDto, userRoles);
  }
}
