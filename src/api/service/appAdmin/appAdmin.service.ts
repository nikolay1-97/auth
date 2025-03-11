import { Injectable, BadRequestException } from '@nestjs/common';
import { AppAdminRepository } from 'src/db/repositories/appAdmin/repository';
import { PasswordService } from 'src/feature-md/password/password.service';
import { CreateAppAdminDto } from 'src/api/dto/appAdmin/appAdminCreate.dto';
import { CreateAppAdminResponseDto } from 'src/api/dtoResponse/appAdmin/appAdminCreateResponse.dto';


@Injectable()
export class AppAdminService {
  constructor(
    private readonly appAdminRepository: AppAdminRepository,
    private readonly passwordService: PasswordService,
  ) {}


  async create(
    dto: CreateAppAdminDto,
  ): Promise<CreateAppAdminDto> {
    const appAdmin =
      await this.appAdminRepository.getByEmail(dto.email);

    if (!appAdmin) {
      await this.appAdminRepository.create(dto);
      return dto;
    }
    throw new BadRequestException('appAdmin already exists');
  }
}
