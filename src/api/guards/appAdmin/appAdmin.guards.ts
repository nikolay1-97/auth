import { AuthGuard } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppAdminGuard extends AuthGuard('appAdmin-strategy') {}
