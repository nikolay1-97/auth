import { Injectable, BadRequestException } from '@nestjs/common';
import { UserRepository } from 'src/db/repositories/user/repository';
import { AppRepository } from 'src/db/repositories/app/repository';
import { PasswordService } from 'src/feature-md/password/password.service';
import { CreateUserDto } from 'src/api/dto/user/userCreate.dto';
import { CreateUserResponseDto } from 'src/api/dtoResponse/user/userCreateResponse.dto';


@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly appRepository: AppRepository,
    private readonly passwordService: PasswordService,
  ) {}


  async create(
    dto: CreateUserDto,
  ): Promise<CreateUserResponseDto> {
    const app =
      await this.appRepository.getBySecret(dto.secret);
    if (!app) {
        throw new BadRequestException('app not found')
    }

    const user = await this.userRepository.getByEmail(dto.email)
    if (!user) {
      await this.userRepository.create(app.id, dto);
      return new CreateUserResponseDto({email: dto.email});
    }
    throw new BadRequestException('user already exists');
  }
}
