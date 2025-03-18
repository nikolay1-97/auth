import { AuthGuard } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SuperAdminGuard extends AuthGuard('superAdmin-strategy') {}
