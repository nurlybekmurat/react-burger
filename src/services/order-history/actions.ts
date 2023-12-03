import { TWsActions } from "../middleware/customMiddleware";
export const ORDER_HISTORY_START: 'ORDER_HISTORY_START' = 'ORDER_HISTORY_START';
export const ORDER_HISTORY_SUCCESS: 'ORDER_HISTORY_SUCCESS' = 'ORDER_HISTORY_SUCCESS';
export const ORDER_HISTORY_ERROR: 'ORDER_HISTORY_ERROR' = 'ORDER_HISTORY_ERROR';
export const ORDER_HISTORY_CLOSED: 'ORDER_HISTORY_CLOSED' = 'ORDER_HISTORY_CLOSED';
export const ORDER_HISTORY_CLOSE: 'ORDER_HISTORY_CLOSE' = 'ORDER_HISTORY_CLOSE'
export const ORDER_HISTORY_GET_MESSAGE: 'ORDER_HISTORY_GET_MESSAGE' = 'ORDER_HISTORY_GET_MESSAGE';
  
export interface IOrderHistoryStart {
    readonly type: typeof ORDER_HISTORY_START,
    readonly payload: string
}

export interface IOrderHistoryClose {
  readonly type: typeof ORDER_HISTORY_CLOSE,
  readonly payload: string
}


export type TOrderHistoryActions = 
  | IOrderHistoryStart
  | IOrderHistoryClose


export const orderHistoryStart = (Url: string) => {
    return {
      type: ORDER_HISTORY_START,
      payload: Url
    };
  };

  export const orderHistoryClose = (reason: string) => {
    return {
      type: ORDER_HISTORY_CLOSE,
      payload: reason
    }
  }

  export const orderHistoryActions: TWsActions = {
    init: ORDER_HISTORY_START,
    success: ORDER_HISTORY_SUCCESS,
    closed: ORDER_HISTORY_CLOSED,
    error: ORDER_HISTORY_ERROR,
    close: ORDER_HISTORY_CLOSE,
    message: ORDER_HISTORY_GET_MESSAGE
  }