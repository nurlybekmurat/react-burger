import { TOrderFeed } from "../../utils/types";
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

export interface IOrderFeedSuccess {
  readonly type: typeof ORDER_FEED_SUCCESS,
  payload: any
}

export interface IOrderFeedError {
  readonly type: typeof ORDER_FEED_ERROR,
  readonly payload: Event
}

export interface IOrderFeedClosed {
  readonly type: typeof ORDER_FEED_CLOSED,
}

export interface IOrderFeedClose {
  readonly type: typeof ORDER_FEED_CLOSE,
  readonly payload: string
}

export interface IOrderFeedGetMessage {
  readonly type: typeof ORDER_FEED_GET_MESSAGE,
  readonly payload: TOrderFeed | null
}


export type TOrderFeedActions = 
  | IOrderFeedStart
  | IOrderFeedSuccess
  | IOrderFeedError
  | IOrderFeedClose
  | IOrderFeedClosed
  | IOrderFeedGetMessage


export const orderFeedStart = (Url: string) => {
  return {
    type: ORDER_FEED_START,
    payload: Url
  };
};

// export const orderFeedSuccess = () => {
//   return {
//     type: ORDER_FEED_SUCCESS,
//   }
// }

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