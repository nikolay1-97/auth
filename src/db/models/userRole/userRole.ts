import { BaseModel } from "../baseModel";

export class UserRole extends BaseModel {
  static tableName = 'userRole';

  userId: number;
  roleId: number;
}
