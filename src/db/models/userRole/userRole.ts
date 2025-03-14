import { BaseModel } from "../baseModel";
import { Model } from "objection";

export class UserRole extends Model {
  static tableName = 'user_role';

  static get idColumn() {
    return 'user_id';
  }

  user_id: number;
  role_id: number;
}
