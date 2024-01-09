import { REGISTER_SUCCESS, REGISTER_REQUEST, REGISTER_FAILED } from '../services/register/actions';
import { registerReducer, initialStateRegister } from '../services/register/reducers';

describe('Тестирование регистрации', () => {
  const registerResponse = {
    success: true,
    user: {
      email: "test@test",
      name: "test"
    },
    accessToken: "Bearer 9516asd51dfasddfg1",
    refreshToken: "asda548d15a8sd14"
  }
  it('запрос регистрации', () => {
    const result = registerReducer(initialStateRegister, { type: REGISTER_REQUEST });
    expect(result.isLoading)
      .toEqual(true)
  })
  it('регистрация успешно', () => {
    const result = registerReducer(initialStateRegister, { type: REGISTER_SUCCESS, payload: registerResponse });
    expect(result.response)
      .toEqual(registerResponse)
  })
  it('ошибка регистрации', () => {
    const result = registerReducer(initialStateRegister, { type: REGISTER_FAILED, payload: 'Ошибка'});
    expect(result.errorText)
      .toEqual('Ошибка')
  })
})