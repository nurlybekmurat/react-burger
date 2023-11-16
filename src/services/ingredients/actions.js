import { request } from '../../utils/utils';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';


export const getIngredients = () => (dispatch) => {
  dispatch({ type: GET_INGREDIENTS_REQUEST });
  request('ingredients').then(data => {
    dispatch({ type: GET_INGREDIENTS_SUCCESS, payload: data.data })
  }).catch((err)=> { dispatch({ type: GET_INGREDIENTS_FAILED, payload: err.message})})
}