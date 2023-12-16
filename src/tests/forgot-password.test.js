import { recoverPasswordReducer, initialStateForgotPass } from '../services/forgot-password/reducers';
import { recoverPassword, cleanRecoverPassword } from '../services/forgot-password/actions';

describe('Тестирование забыл паоль', () => {
  it('успешно прошел запрос', () => {
    expect(recoverPasswordReducer(initialStateForgotPass, recoverPassword('test@test')))
      .toEqual({
        emailRecoverSuccess: false,
        isLoading: false,
        success: false,
        isRequestSent: false,
        errorText: ''
      })
  })
  it('очистка состояние восстановление пароля', () => {
    expect(recoverPasswordReducer(initialStateForgotPass, cleanRecoverPassword()))
      .toEqual({
        isLoading: false,
        success: false,
        isRequestSent: false,
        emailRecoverSuccess: false, 
        errorText: ''
      })
  })
})
