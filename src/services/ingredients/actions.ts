import { request } from '../../utils/utils';
import { AppDispatch, AppThunk } from '../store';

export const GET_INGREDIENTS_REQUEST: 'GET_INGREDIENTS_REQUEST' = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS: 'GET_INGREDIENTS_SUCCESS' = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED: 'GET_INGREDIENTS_FAILED' = 'GET_INGREDIENTS_FAILED';


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