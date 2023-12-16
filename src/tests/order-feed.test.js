import { orderFeedClose } from '../services/order-feed/actions';
import { orderFeedReducer, initialStateOrderFeed } from '../services/order-feed/reducers';

describe('Тестирование Ленты заказов', () => {

  it('вебсокет закрыт', () => {
    const result = orderFeedReducer(initialStateOrderFeed, orderFeedClose('причина'));
    expect(result.wsConnected)
      .toEqual(false)
  })
})
