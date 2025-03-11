import { BaseModel } from "../baseModel";

export class AppAdmin extends BaseModel {
  static tableName = 'app_admin';

  email: string;
  password: string;
  created_at: string;
}
