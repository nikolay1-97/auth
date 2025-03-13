import { Injectable, BadRequestException } from '@nestjs/common';
import { AppRepository } from 'src/db/repositories/app/repository';
import { SecretService } from 'src/feature-md/secret/secret.service';
import { CreateAppDto } from 'src/api/dto/app/appCreate.dto';
import { GetListAppResponseDto } from 'src/api/dtoResponse/app/appGetListByOwnerId';
import { DeleteAppResponseDto } from 'src/api/dtoResponse/app/appDeleteResponse.dto';
import { plainToInstance } from 'class-transformer';


@Injectable()
export class AppsService {
  constructor(
    private readonly appRepository: AppRepository,
    private readonly secretService: SecretService,
  ) {}

  async create(
    appAdminId: number,
    dto: CreateAppDto,
  ): Promise<CreateAppDto> {
    const app =
      await this.appRepository.getByTitle(dto.title);

    if (!app) {
      const secret: string = await this.secretService.getSecret()
      await this.appRepository.create(appAdminId, secret, dto);
      return dto;
    }
    throw new BadRequestException('app already exists');
  }

  async update(
    id: number,
  ): Promise<boolean | undefined> {
    const app = await this.appRepository.getById(id);

    if (!app) {
      throw new BadRequestException('app not found');
    }
    const secret = await this.secretService.getSecret()
    await this.appRepository.update(id, secret);
    return true;
  }

  async getByOwnerId(
    owner_id: number,
  ): Promise<GetListAppResponseDto[]> {
    const apps = await this.appRepository.getByOwnerId(owner_id);

    return plainToInstance(GetListAppResponseDto, apps)
  }

  async delete(id: number): Promise<DeleteAppResponseDto> {
    const app = await this.appRepository.getById(id);

    if (!app) {
      throw new BadRequestException('app not found');
    }
    await this.appRepository.delete(id);
    return new DeleteAppResponseDto({id: app.id, title: app.title})
    
  }

}