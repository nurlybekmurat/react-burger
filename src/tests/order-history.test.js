import { orderHistoryReducer, initialStateOrderHistory } from '../services/order-history/reducers';
import { 
  ORDER_HISTORY_SUCCESS,
  ORDER_HISTORY_ERROR,
  ORDER_HISTORY_CLOSED,
  ORDER_HISTORY_GET_MESSAGE
} from '../services/order-history/actions';

describe('Тестирование Ленты заказов профиля', () => {
  const orderFeedResponse = {
    success: true,
    orders: [
      {
        _id: "64db040282e277001bfa91b0",
        ingredients: [
          "643d69a5c3f7b9001cfa093d",
          "643d69a5c3f7b9001cfa0943",
          "643d69a5c3f7b9001cfa093d"
        ],
        "status": "done",
        name: "Space флюоресцентный бургер",
        createdAt: "2023-08-15T04:50:10.930Z",
        updatedAt: "2023-08-15T04:50:11.190Z",
        number: 16729
      },
      {
        _id: "64db053a82e277001bfa91b3",
        ingredients: [
          "643d69a5c3f7b9001cfa093d",
          "643d69a5c3f7b9001cfa0943",
          "643d69a5c3f7b9001cfa093d"
        ],
        "status": "done",
        name: "Space флюоресцентный бургер",
        createdAt: "2023-08-15T04:55:22.546Z",
        updatedAt: "2023-08-15T04:55:22.755Z",
        number: 16730
      },
      {
        _id: "64db06ac82e277001bfa91b4",
        ingredients: [
          "643d69a5c3f7b9001cfa093d",
          "643d69a5c3f7b9001cfa0942",
          "643d69a5c3f7b9001cfa093d"
        ],
        "status": "done",
        name: "Флюоресцентный spicy бургер",
        createdAt: "2023-08-15T05:01:32.540Z",
        updatedAt: "2023-08-15T05:01:32.739Z",
        number: 16731
      },
    ],
  total: 16872,
  totalToday: 114
  }

  it('проверка начального состояния', () => {
    expect(orderHistoryReducer(undefined, {})).toEqual(initialStateOrderHistory);
  })
  it('проверка успешного соединения', () => {
    const result = orderHistoryReducer(initialStateOrderHistory, { type: ORDER_HISTORY_SUCCESS });
    expect(result).toEqual({
      error: undefined,
      wsConnected: true,
      orderHistory: null
    });
  })
  it('проверка ошибки соединения', () => {
    const result = orderHistoryReducer(initialStateOrderHistory, { type: ORDER_HISTORY_ERROR, payload: 'err' });
    expect(result.error).toEqual('err');
  })
  it('проверка закрытия соединения', () => {
    const result = orderHistoryReducer(initialStateOrderHistory, { type: ORDER_HISTORY_CLOSED });
    expect(result).toEqual({
      error: undefined,
      wsConnected: false,
      orderHistory: null
    });
  })
  it('проверка добавления', () => {
    const result = orderHistoryReducer(initialStateOrderHistory, { type: ORDER_HISTORY_GET_MESSAGE, payload: orderFeedResponse });
    expect(result.orderHistory).toEqual(orderFeedResponse);
  })
})