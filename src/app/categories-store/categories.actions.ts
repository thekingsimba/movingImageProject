import { Category } from '../models/interfaces';


export class SetCategoriesData {
  static readonly type = '[Categories] set Categories data';
  constructor(public payload: Category[]) { }
}
