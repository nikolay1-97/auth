import { Injectable, BadRequestException } from '@nestjs/common';
import { AppAdminRepository } from 'src/db/repositories/appAdmin/repository';
import { CreateAppAdminDto } from 'src/api/dto/appAdmin/appAdminCreate.dto';
import { CreateAppAdminResponseDto } from 'src/api/dtoResponse/appAdmin/appAdminCreateResponse.dto';
import { ChangeEmailAppAdminDto } from 'src/api/dto/appAdmin/admin/appAdminChangeEmail.dto';
import { ChangeEmailAppAdminResponseDto } from 'src/api/dtoResponse/appAdmin/admin/appAdminChangeEmailResponse.dto';
import { ChangePasswordAppAdminDto } from 'src/api/dto/appAdmin/admin/appAdminChangePassword.dto';
import { ChangePasswordAppAdminResponseDto } from 'src/api/dtoResponse/appAdmin/admin/appAdminChangePasswordResponse.dto';
import { DeleteAppAdminResponseDto } from 'src/api/dtoResponse/appAdmin/admin/appAdminDelete.response.dto';
import { GetAppAdminsResponseDto } from 'src/api/dtoResponse/appAdmin/admin/appAdminGetList.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class AppAdminService {
  constructor(private readonly appAdminRepository: AppAdminRepository) {}

  async create(dto: CreateAppAdminDto): Promise<CreateAppAdminResponseDto> {
    const appAdmin = await this.appAdminRepository.getByEmail(dto.email);

    if (!appAdmin) {
      await this.appAdminRepository.create(dto);
      return new CreateAppAdminResponseDto({ email: dto.email });
    }
    throw new BadRequestException('appAdmin already exists');
  }

  async changeEmail(
    id: number,
    dto: ChangeEmailAppAdminDto,
  ): Promise<ChangeEmailAppAdminResponseDto> {
    const appAdmin = await this.appAdminRepository.getById(id);

    if (!appAdmin) {
      throw new BadRequestException('appAdmin not found');
    }
    const appAdminByEmail = await this.appAdminRepository.getByEmail(dto.email);
    if (appAdminByEmail) {
      throw new BadRequestException('appAdmin already exists');
    }
    await this.appAdminRepository.changeEmail(id, dto);
    return new ChangeEmailAppAdminResponseDto({ email: dto.email });
  }

  async changePassword(
    id: number,
    dto: ChangePasswordAppAdminDto,
  ): Promise<ChangePasswordAppAdminResponseDto> {
    const appAdmin = await this.appAdminRepository.getById(id);

    if (!appAdmin) {
      throw new BadRequestException('appAdmin not found');
    }
    await this.appAdminRepository.changePassword(id, dto);
    return new ChangePasswordAppAdminResponseDto({
      message: 'successfully updated',
    });
  }

  async delete(id: number): Promise<DeleteAppAdminResponseDto> {
    const appAdmin = await this.appAdminRepository.getById(id);

    if (!appAdmin) {
      throw new BadRequestException('appAdmin not found');
    }
    await this.appAdminRepository.delete(id);
    return new DeleteAppAdminResponseDto({
      id: appAdmin.id,
      email: appAdmin.email,
    });
  }

  async getAppAdmins(): Promise<GetAppAdminsResponseDto[]> {
    const appAdmins = await this.appAdminRepository.getAppAdmins();

    return plainToInstance(GetAppAdminsResponseDto, appAdmins);
  }
}
