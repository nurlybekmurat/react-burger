import { orderHistoryClose } from '../services/order-history/actions';
import { orderHistoryReducer, initialStateOrderHistory } from '../services/order-history/reducers';

describe('Тестирование Ленты заказов профиля', () => {

  it('вебсокет закрыт', () => {
    const result = orderHistoryReducer(initialStateOrderHistory, orderHistoryClose('причина'));
    expect(result.wsConnected)
      .toEqual(false)
  })
})