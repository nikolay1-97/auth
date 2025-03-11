import { BaseModel } from "../baseModel";

export class Role extends BaseModel {
  static tableName = 'roles';

  name: string;
  appId: number;
  created_at: string;
}
