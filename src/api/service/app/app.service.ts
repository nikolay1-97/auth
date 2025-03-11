import { Injectable, BadRequestException } from '@nestjs/common';
import { AppRepository } from 'src/db/repositories/app/repository';
import { SecretService } from 'src/feature-md/secret/secret.service';
import { CreateAppDto } from 'src/api/dto/app/appCreate.dto';
import { appendFile } from 'fs/promises';


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
}
