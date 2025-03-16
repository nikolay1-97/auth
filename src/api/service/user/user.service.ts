import { Injectable, BadRequestException } from '@nestjs/common';
import { UserRepository } from 'src/db/repositories/user/repository';
import { AppRepository } from 'src/db/repositories/app/repository';
import { PasswordService } from 'src/feature-md/password/password.service';
import { CreateUserDto } from 'src/api/dto/user/userCreate.dto';
import { CreateUserResponseDto } from 'src/api/dtoResponse/user/userCreateResponse.dto';
import { UserChangePasswordDto } from 'src/api/dto/user/userChangePassword.dto';
import { ChangePasswordResponseDto } from 'src/api/dtoResponse/user/userChangePasswordResponse.dto';
import { GetUsersByAppIdUserResponseDto } from 'src/api/dtoResponse/user/usersGetByAppIdResponse.dto';
import { plainToInstance } from 'class-transformer';


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

  async changePassword(
    id: number,
    dto: UserChangePasswordDto,
  ): Promise<ChangePasswordResponseDto> {
    const user =
      await this.userRepository.getById(id);
    if (!user) {
        throw new BadRequestException('user not found')
    }
    const qst: string = user.data.question;
    const answer: string = user.data.answer;

    if (qst != dto.data.question || answer != dto.data.answer) {
        throw new BadRequestException('incorrect data')
    }
    await this.userRepository.changePassword(id, dto.password)
    return new ChangePasswordResponseDto({message: 'successfully updated'})

  }

  async getByAppId(
      app_id: number,
    ): Promise<GetUsersByAppIdUserResponseDto[]> {
      const users = await this.userRepository.getByAppid(app_id);
  
      return plainToInstance(GetUsersByAppIdUserResponseDto, users)
  }
}
