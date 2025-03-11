import { AuthGuard } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppAdminGuards extends AuthGuard('appAdmin-strategy') {}
