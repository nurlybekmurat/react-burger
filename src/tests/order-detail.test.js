import { orderReducer, initialStateOrderDetail } from '../services/order-detail/reducers';
import { GET_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDER_FAILED, } from '../services/order-detail/actions';

describe('Тестирование детали заказа', () => {
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

  it('проверка начального состояния', () => {
    expect(orderReducer(undefined, {})).toEqual(initialStateOrderDetail);
  })

  it('проверка запроса', () => {
    const result = orderReducer(initialStateOrderDetail, { type: GET_ORDER_REQUEST });
    expect(result.isLoading).toEqual(true)
  })
  it('проверка успешного запроса', () => {
    const result = orderReducer(initialStateOrderDetail, { type: GET_ORDER_SUCCESS, element: orderResponse });
    expect(result.order).toEqual(orderResponse.order)
  })
  it('проверка ошибки запроса', () => {
    const result = orderReducer(initialStateOrderDetail, { type: GET_ORDER_FAILED, element: 'errorText' });
    expect(result.errorText).toEqual('errorText')
  })
})