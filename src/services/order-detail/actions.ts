import { TElement, TOrderResponse } from "../../utils/types";
import { request } from "../../utils/utils";
import { AppDispatch, AppThunk } from "../store";

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';

export const postOrder: AppThunk = (body: string[], token: string) => {
  return function (dispatch: AppDispatch) {
    request('orders', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        ingredients: body
      })
    }).then((data) => {
      console.log(data)
      dispatch({ type: GET_ORDER_SUCCESS, element: data }) 
    }).catch((err) => dispatch(getOrderFailed(err.message)));
  }
}

export const getOrderRequest = () => ({
  type: GET_ORDER_REQUEST,
});

export const getOrderDetail = (element: TOrderResponse) => ({
  type: GET_ORDER_SUCCESS,
  element
});

export const getOrderFailed = (element: TElement) => ({
  type: GET_ORDER_FAILED,
  element
});
