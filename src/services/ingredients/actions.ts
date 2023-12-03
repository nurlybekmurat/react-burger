import { TElement } from '../../utils/types';
import { request } from '../../utils/utils';
import { AppDispatch, AppThunk } from '../store';

export const GET_INGREDIENTS_REQUEST: 'GET_INGREDIENTS_REQUEST' = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS: 'GET_INGREDIENTS_SUCCESS' = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED: 'GET_INGREDIENTS_FAILED' = 'GET_INGREDIENTS_FAILED';


export interface IGetIngredientsRequest {
  readonly type: typeof GET_INGREDIENTS_REQUEST
}

export interface IGetIngredientsSuccess {
  readonly type: typeof GET_INGREDIENTS_SUCCESS,
  payload: {
    readonly success: boolean,
    readonly data: TElement[]
}
}

export interface IGetIngredientsFailed {
  readonly type: typeof GET_INGREDIENTS_FAILED,
  payload: string
}


export type TGetIngredientsActions = 
| IGetIngredientsRequest
| IGetIngredientsSuccess
| IGetIngredientsFailed

export const getIngredients: AppThunk = () => {
  return function (dispatch: AppDispatch) {
    dispatch({ type: GET_INGREDIENTS_REQUEST });
    request('ingredients', {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        Accept: "application/json"
    }
    }).then((data) => {
      dispatch({ type: GET_INGREDIENTS_SUCCESS, payload: data })
    }).catch((err)=> { dispatch({ type: GET_INGREDIENTS_FAILED, payload: err.message})})
  }
}