import { BaseModel } from '../baseModel';

export class SuperAdmin extends BaseModel {
  static tableName = 'super_admin';

  email: string;
  password: string;
  created_at: string;
}
