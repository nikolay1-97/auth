import { BaseModel } from "../baseModel";

export class App extends BaseModel {
  static tableName = 'app';

  title: string;
  secret: string;
  owner_id: number;
  created_at: string;
}
