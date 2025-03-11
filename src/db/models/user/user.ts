import { BaseModel } from "../baseModel";

export class User extends BaseModel {
  static tableName = 'users';

  appId: number;
  email: string;
  password: string;
  data: Record<string, any>;
  created_at: string;
}
