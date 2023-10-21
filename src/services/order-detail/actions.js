export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';

export const getOrderRequest = () => ({
  type: GET_ORDER_REQUEST,
});

export const getOrderDetail = (element) => ({
  type: GET_ORDER_SUCCESS,
  element
});

export const getOrderFailed = (element) => ({
  type: GET_ORDER_FAILED,
  element
});
