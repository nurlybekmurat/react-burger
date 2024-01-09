import { orderFeedReducer, initialStateOrderFeed } from '../services/order-feed/reducers';
import { 
  ORDER_FEED_SUCCESS, 
  ORDER_FEED_ERROR, 
  ORDER_FEED_CLOSED,
  ORDER_FEED_GET_MESSAGE,
} from '../services/order-feed/actions';

describe('Тестирование Ленты заказов', () => {
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
    expect(orderFeedReducer(undefined, {})).toEqual(initialStateOrderFeed);
  })
  it('проверка успешного соединения', () => {
    const result = orderFeedReducer(initialStateOrderFeed, { type: ORDER_FEED_SUCCESS });
    expect(result).toEqual({
      error: undefined,
      wsConnected: true,
      orderFeed: null
    });
  })
  it('проверка ошибки соединения', () => {
    const result = orderFeedReducer(initialStateOrderFeed, { type: ORDER_FEED_ERROR, payload: 'err' });
    expect(result.error).toEqual('err');
  })
  it('проверка закрытия соединения', () => {
    const result = orderFeedReducer(initialStateOrderFeed, { type: ORDER_FEED_CLOSED });
    expect(result).toEqual({
      error: undefined,
      wsConnected: false,
      orderFeed: null
    });
  })
  it('проверка добавления', () => {
    const result = orderFeedReducer(initialStateOrderFeed, { type: ORDER_FEED_GET_MESSAGE, payload: orderFeedResponse });
    expect(result.orderFeed).toEqual(orderFeedResponse);
  })
})
