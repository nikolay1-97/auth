import { BaseModel } from "../baseModel";

export class Role extends BaseModel {
  static tableName = 'roles';

  title: string;
  app_id: number;
  created_at: string;
}
