import type { Middleware, MiddlewareAPI } from 'redux';
import { AppDispatch, RootState, TWsApplicationActions } from '../store';

export type TWsActions = {
    init: string;
    success: string;
    closed: string;
    error: string;
    close: string;
    message: string;
  };

export const socketMiddleware = (wsActions: TWsActions): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;

        return next => (action: TWsApplicationActions) => {
            const { dispatch } = store;

            if (action.type === wsActions.init) {
                socket = new WebSocket(action.payload);
            }
            if (socket) {
                socket.onopen = event => {
                    dispatch({ type: wsActions.success, payload: event });
                };
                socket.onerror = event => {
                    dispatch({ type: wsActions.error, payload: event });
                };
                socket.onmessage = (event: MessageEvent) => {
                    const { data } = event;
                    const parsedData = JSON.parse(data);
                    dispatch({ type: wsActions.message, payload: parsedData });
                };
                socket.onclose = event => {
                    dispatch({ type: wsActions.closed, payload: event });
                };
                if (action.type === wsActions.close) {
                    socket.close(1000, action.payload)
                }
            }
            next(action);

        };
    }) as Middleware;
};