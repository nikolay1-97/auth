import { Injectable, BadRequestException } from '@nestjs/common';
import { AppRepository } from 'src/db/repositories/app/repository';
import { RoleRepository } from 'src/db/repositories/role/repository';
import { CreateRoleDto } from 'src/api/dto/role/roleCreate.dto';
import { CreateRoleResponseDto } from 'src/api/dtoResponse/role/roleCreateResponse.dto';
import { RoleChangeTitleDto } from 'src/api/dto/role/roleChangeTitle.dto';
import { RoleChangeTitleResponseDto } from 'src/api/dtoResponse/role/roleChangeTitleResponse.dto';
import { DeleteRoleResponseDto } from 'src/api/dtoResponse/role/roleDelete.dto';
import { RoleGetListByAppIdResponseDto } from 'src/api/dtoResponse/role/roleGetListByAppIdResponse.dto';
import { plainToInstance } from 'class-transformer';




@Injectable()
export class RoleService {
  constructor(
    private readonly roleRepository: RoleRepository,
    private readonly appRepository: AppRepository,
  ) {}

  async create(
    dto: CreateRoleDto,
  ): Promise<CreateRoleResponseDto> {
    const app = await this.appRepository.getById(dto.app_id)
    if (!app) {
        throw new BadRequestException('app not found')
    }
    const role =
      await this.roleRepository.getByTitle(dto.title);

    if (!role) {
      await this.roleRepository.create(dto);
      return new CreateRoleResponseDto({title: dto.title, app_id: dto.app_id});
    }
    throw new BadRequestException('role already exists');
  }

  async changeTitle(
    id: number,
    dto: RoleChangeTitleDto,
  ): Promise<RoleChangeTitleResponseDto> {
    const role = await this.roleRepository.getById(id);

    if (!role) {
      throw new BadRequestException('role not found');
    }
    const roleByTitle = await this.roleRepository.getByTitle(dto.title)
    if (roleByTitle) {
        throw new BadRequestException('role already exists')
    }
    await this.roleRepository.changeTitle(id, dto);
    return new RoleChangeTitleResponseDto({newTitle: dto.title});
  }

  async delete(id: number): Promise<DeleteRoleResponseDto> {
      const role = await this.roleRepository.getById(id);
  
      if (!role) {
        throw new BadRequestException('role not found');
      }
      await this.roleRepository.delete(id);
      return new DeleteRoleResponseDto({
        id: role.id,
        app_id: role.app_id,
        title: role.title,
      })
  }

  async getListByAppId(id: number): Promise<RoleGetListByAppIdResponseDto[]> {
    const roles = await this.roleRepository.getByAppId(id);

    return plainToInstance(RoleGetListByAppIdResponseDto, roles)
  }

}