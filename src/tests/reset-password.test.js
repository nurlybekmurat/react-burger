import { PASSWORD_RESET_REQUEST, PASSWORD_RESET_SUCCESS, PASSWORD_RESET_FAILED, PASSWORD_RESET_CLEAN_STATE } from '../services/reset-password/actions';
import { passwordResetReduser, initialStateResetPass } from '../services/reset-password/reducers';

describe('Тестирование регистрации', () => {
  const response = {
    passwordResetFailed: false,
    passwordResetRequest: false,
    response:  {
      message: "Password successfully reset",
      success: true,
    }
  }

  it('запрос сброса пароля', () => {
    const result = passwordResetReduser(initialStateResetPass, { type: PASSWORD_RESET_REQUEST });
    expect(result)
      .toEqual({
        passwordResetRequest: true,
        passwordResetFailed: false,
        response: null
      })
  })
  it('сброс пароля прошла успешна', () => {
    const result = passwordResetReduser(initialStateResetPass, { type: PASSWORD_RESET_SUCCESS, payload: response });
    expect(result.response)
      .toEqual(response)
  })
  it('ошибка сброса пароля', () => {
    const result = passwordResetReduser(initialStateResetPass, { type: PASSWORD_RESET_FAILED});
    expect(result)
      .toEqual({
        passwordResetRequest: false,
        passwordResetFailed: true,
        response: null
      })
  })
  it('очистка состояния', () => {
    const result = passwordResetReduser(initialStateResetPass, { type: PASSWORD_RESET_CLEAN_STATE});
    expect(result)
      .toEqual({
        passwordResetRequest: false,
        passwordResetFailed: false,
        response: null
      })
  })
})