import { Injectable, BadRequestException } from '@nestjs/common';
import { UserRepository } from 'src/db/repositories/user/repository';
import { AppRepository } from 'src/db/repositories/app/repository';
import { PasswordService } from 'src/feature-md/password/password.service';
import { RoleRepository } from 'src/db/repositories/role/repository';
import { CreateUserDto } from 'src/api/dto/user/userCreate.dto';
import { CreateUserResponseDto } from 'src/api/dtoResponse/user/userCreateResponse.dto';
import { UserChangePasswordDto } from 'src/api/dto/user/userChangePassword.dto';
import { ChangePasswordResponseDto } from 'src/api/dtoResponse/user/userChangePasswordResponse.dto';
import { GetUsersByAppIdUserResponseDto } from 'src/api/dtoResponse/user/usersGetByAppIdResponse.dto';
import { ChangeEmailUserDto } from 'src/api/dto/user/admin/userChangeEmail.dto';
import { ChangeEmailUserResponseDto } from 'src/api/dtoResponse/user/admin/userChangeEmailResponse.dto';
import { ChangePasswordUserDto } from 'src/api/dto/user/admin/userChangePassword.dto';
import { ChangePasswordUserResponseDto } from 'src/api/dtoResponse/user/admin/userChangePasswordResponse.dto';
import { DeleteUserResponseDto } from 'src/api/dtoResponse/user/admin/userDeleteResponse.dto';
import { GetUsersByAppIdForAdminResponseDto } from 'src/api/dtoResponse/user/admin/userGetUsersByAppIdForAdmin.dto';
import { GetUsersByAppIdAndRoleIdResponseDto } from 'src/api/dtoResponse/user/userGetUsersByAppIdAndRoleIdResponse.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly appRepository: AppRepository,
    private readonly roleRepository: RoleRepository,
    private readonly passwordService: PasswordService,
  ) {}

  async create(dto: CreateUserDto): Promise<CreateUserResponseDto> {
    const app = await this.appRepository.getBySecret(dto.secret);
    if (!app) {
      throw new BadRequestException('app not found');
    }

    const user = await this.userRepository.getByEmailAndAppId(
      app.id,
      dto.credentials.email,
    );
    if (!user) {
      await this.userRepository.create(app.id, dto);
      return new CreateUserResponseDto({ email: dto.credentials.email });
    }
    throw new BadRequestException('user already exists');
  }

  async changePassword(
    id: number,
    dto: UserChangePasswordDto,
  ): Promise<ChangePasswordResponseDto> {
    const user = await this.userRepository.getById(id);
    if (!user) {
      throw new BadRequestException('user not found');
    }
    const qst: string = user.data.question;
    const answer: string = user.data.answer;

    if (qst != dto.data.question || answer != dto.data.answer) {
      throw new BadRequestException('incorrect data');
    }
    await this.userRepository.changePassword(id, dto.password);
    return new ChangePasswordResponseDto({ message: 'successfully updated' });
  }

  async getByAppId(app_id: number): Promise<GetUsersByAppIdUserResponseDto[]> {
    const app = await this.appRepository.getById(app_id);
    if (!app) {
      throw new BadRequestException('app not found');
    }
    const users = await this.userRepository.getByAppid(app_id);

    return plainToInstance(GetUsersByAppIdUserResponseDto, users);
  }

  async getByAppIdForAdmin(
    app_id: number,
  ): Promise<GetUsersByAppIdForAdminResponseDto[]> {
    const app = await this.appRepository.getById(app_id);
    if (!app) {
      throw new BadRequestException('app not found');
    }
    const users = await this.userRepository.getByAppid(app_id);

    return plainToInstance(GetUsersByAppIdForAdminResponseDto, users);
  }

  async getByAppIdAndRoleId(
    app_id: number,
    role_id: number,
  ): Promise<GetUsersByAppIdAndRoleIdResponseDto[]> {
    const app = await this.appRepository.getById(app_id);
    if (!app) {
      throw new BadRequestException('app not found');
    }

    const role = await this.roleRepository.getById(role_id);
    if (!role) {
      throw new BadRequestException('role not found');
    }

    const users = await this.userRepository.getByAppIdAndRoleId(
      app_id,
      role_id,
    );

    return plainToInstance(GetUsersByAppIdAndRoleIdResponseDto, users);
  }

  async changeEmail(
    id: number,
    dto: ChangeEmailUserDto,
  ): Promise<ChangeEmailUserResponseDto> {
    const user = await this.userRepository.getById(id);

    if (!user) {
      throw new BadRequestException('user not found');
    }
    const userByEmail = await this.userRepository.getByEmail(dto.email);
    if (userByEmail) {
      throw new BadRequestException('user already exists');
    }
    await this.userRepository.changeEmail(id, dto);
    return new ChangeEmailUserResponseDto({ email: dto.email });
  }

  async changePasswordForAdmin(
    id: number,
    dto: ChangePasswordUserDto,
  ): Promise<ChangePasswordUserResponseDto> {
    const user = await this.userRepository.getById(id);

    if (!user) {
      throw new BadRequestException('user not found');
    }
    await this.userRepository.changePassword(id, dto.password);
    return new ChangePasswordUserResponseDto({
      message: 'successfully updated',
    });
  }

  async delete(id: number): Promise<DeleteUserResponseDto> {
    const user = await this.userRepository.getById(id);

    if (!user) {
      throw new BadRequestException('user not found');
    }
    await this.userRepository.delete(id);
    return new DeleteUserResponseDto({
      id: user.id,
      email: user.email,
    });
  }
}
