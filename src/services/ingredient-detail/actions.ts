import { TElement } from "../../utils/types";

export const GET_INGREDIENT_DETAIL: 'GET_INGREDIENT_DETAIL' = 'GET_INGREDIENT_DETAIL';
export const CLEAR_INGREDIENT_DETAIL: 'CLEAR_INGREDIENT_DETAIL' = 'CLEAR_INGREDIENT_DETAIL';

export interface IGetIngredientDetail {
  readonly type: typeof GET_INGREDIENT_DETAIL,
  element: TElement
}

export interface ICleanIngredientDetail {
  readonly type: typeof CLEAR_INGREDIENT_DETAIL,
}

export type TIngredientDetailActions = 
| IGetIngredientDetail
| ICleanIngredientDetail

export const getIngredientDetail = (element: TElement) => ({
  type: GET_INGREDIENT_DETAIL,
  element
});

export const clearIngredientDetail = () => ({
  type: CLEAR_INGREDIENT_DETAIL
});