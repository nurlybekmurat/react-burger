import { TWsActions } from "../middleware/customMiddleware";

export const ORDER_FEED_START: 'ORDER_FEED_START' = 'ORDER_FEED_START';
export const ORDER_FEED_SUCCESS: 'ORDER_FEED_SUCCESS' = 'ORDER_FEED_SUCCESS';
export const ORDER_FEED_ERROR: 'ORDER_FEED_ERROR' = 'ORDER_FEED_ERROR';
export const ORDER_FEED_CLOSED: 'ORDER_FEED_CLOSED' = 'ORDER_FEED_CLOSED';
export const ORDER_FEED_CLOSE: 'ORDER_FEED_CLOSE' = 'ORDER_FEED_CLOSE'
export const ORDER_FEED_GET_MESSAGE: 'ORDER_FEED_GET_MESSAGE' = 'ORDER_FEED_GET_MESSAGE';
  
export interface IOrderFeedStart {
    readonly type: typeof ORDER_FEED_START,
    readonly payload: string
}

export interface IOrderFeedClose {
  readonly type: typeof ORDER_FEED_CLOSE,
  readonly payload: string
}


export type TOrderFeedActions = 
  | IOrderFeedStart
  | IOrderFeedClose


export const orderFeedStart = (Url: string) => {
    return {
      type: ORDER_FEED_START,
      payload: Url
    };
  };

  export const orderFeedClose = (reason: string) => {
    return {
      type: ORDER_FEED_CLOSE,
      payload: reason
    }
  }

  export const orderFeedActions: TWsActions = {
    init: ORDER_FEED_START,
    success: ORDER_FEED_SUCCESS,
    closed: ORDER_FEED_CLOSED,
    error: ORDER_FEED_ERROR,
    close: ORDER_FEED_CLOSE,
    message: ORDER_FEED_GET_MESSAGE
  }