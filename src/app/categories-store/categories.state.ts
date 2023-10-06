import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Category } from '../models/interfaces';
import { SetCategoriesData } from './categories.actions';
import { Injectable } from '@angular/core';

export interface CategoriesStateModel {
  categoriesLists: Category[];
}

@State<CategoriesStateModel>({
  name: 'categories',
  defaults: {
    categoriesLists: []
  },
})

@Injectable()
export class CategoriesState {
  @Selector()
  static categoriesData(state: CategoriesStateModel): Category[] {
    return state.categoriesLists;
  }

  @Action(SetCategoriesData)
  setCategoriesData(ctx: StateContext<CategoriesStateModel>, { payload }: SetCategoriesData): void {
    ctx.patchState({ categoriesLists: payload });
  }
}
