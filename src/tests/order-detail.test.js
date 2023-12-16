import { orderReducer, initialStateOrderDetail } from '../services/order-detail/reducers';
import { postOrder, getOrderRequest, getOrderDetail, getOrderFailed } from '../services/order-detail/actions';

describe('Тестирование детали заказа', () => {
  const orderRes = {
    error: false,
    errorText: "",
    isLoading: false,
    order: undefined,
  }
  const orderResponse = {
    name: 'string',
    order: {
      createdAt: 'string',
      ingredients: [{
        _id:"643d69a5c3f7b9001cfa093e",
        name:"Ингредиент 1",
        type:"main",
        proteins:44,
        fat:26,
        carbohydrates:85,
        calories:643,
        price:988,
        image:"https://code.s3.yandex.net/react/code/meat-03.png",
        image_mobile:"https://code.s3.yandex.net/react/code/meat-03-mobile.png",
        image_large:"https://code.s3.yandex.net/react/code/meat-03-large.png",
        uniqueId: '777'
      },],
      name: 'string',
      number: '515',
      owner: {
        name: 'Ингредиент',
        email: 'string',
        createdAt: 'string',
        updatedAt: 'string'
      },
      price: 234,
      status: 'string',
      updatedAt: 'string',
      _id: 'string'
    },
    success: true
  }

  it('успешно прошел запрос', () => {
    const result = orderReducer(initialStateOrderDetail, postOrder());
    expect(result)
      .toEqual(orderRes)
  })
  it('тест запроса', () => {
    const result = orderReducer(initialStateOrderDetail, getOrderRequest());
    orderRes.isLoading = true
    expect(result)
      .toEqual(orderRes)
  })
  it('тест ответа  запроса', () => {
    const result = orderReducer(initialStateOrderDetail, getOrderDetail(orderResponse));
    result.order = {...orderResponse}
    expect(result.order)
      .toEqual(orderResponse)
  })
  it('тест ответа  запроса', () => {
    const result = orderReducer(initialStateOrderDetail, getOrderFailed('Ошибка'));
    result.errorText = 'Ошибка';
    expect(result.errorText)
      .toEqual('Ошибка')
  })
})