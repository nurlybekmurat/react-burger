import { TElementState } from "../../utils/types";

export const GET_CONSTRUCTOR_ITEM: 'GET_CONSTRUCTOR_ITEM' = 'GET_CONSTRUCTOR_ITEM';
export const DELETE_CONSTRUCTOR_ITEM: 'DELETE_CONSTRUCTOR_ITEM' = 'DELETE_CONSTRUCTOR_ITEM';
export const GET_BUN_ITEM: 'GET_BUN_ITEM' = 'GET_BUN_ITEM';
export const CLEAR_CONSTRUCTOR_LIST: 'CLEAR_CONSTRUCTOR_LIST' = 'CLEAR_CONSTRUCTOR_LIST';
export const MOVE_CONSTRUCTOR_ITEM: 'CONSTRUCTOR_ITEM' = 'CONSTRUCTOR_ITEM';

export interface IAddIngredient {
  readonly type: typeof GET_CONSTRUCTOR_ITEM,
  element: TElementState
}

export interface IDeleteIngredient {
  readonly type: typeof DELETE_CONSTRUCTOR_ITEM,
  element: TElementState
}

export interface IGetBunItem {
  readonly type: typeof GET_BUN_ITEM,
  element: TElementState
}

export interface IMoveIngredient {
  readonly type: typeof MOVE_CONSTRUCTOR_ITEM,
  readonly dragIndex: number,
  readonly hoverIndex: number

}

export interface ICleanConstructor {
  readonly type: typeof CLEAR_CONSTRUCTOR_LIST
}

export type TBurgerConstructorActions = | IAddIngredient | IDeleteIngredient | IMoveIngredient | ICleanConstructor | IGetBunItem;

export const getConstructorItem = (element: TElementState) => ({
  type: GET_CONSTRUCTOR_ITEM,
  element
});

export const deleteConstructorItem = (element: TElementState) => ({
  type: DELETE_CONSTRUCTOR_ITEM,
  element
});

export const getBunItem = (element: TElementState) => ({
  type: GET_BUN_ITEM,
  element
});

export const clearConstructorList = () => ({
  type: CLEAR_CONSTRUCTOR_LIST
});

export const moveConstructorItem = (dragIndex: number, hoverIndex: number) => ({
  type: MOVE_CONSTRUCTOR_ITEM,
  dragIndex,
  hoverIndex
});