import { recoverPasswordReducer, initialStateForgotPass } from '../services/forgot-password/reducers';
import { 
  GET_PASSWORD_REQUEST, 
  GET_PASSWORD_SUCCESS,
  GET_PASSWORD_FAILED,
  RECOVER_PASSWORD_CLEAN,
  GET_PASSWORD_CLEAN
 } from '../services/forgot-password/actions';

describe('Тестирование забыл паоль', () => {
  const recoverPasswordResponse = true; 
  const failedText ="Err";


  it('проверка начального состояния', () => {
    expect(recoverPasswordReducer(undefined, {})).toEqual(initialStateForgotPass);
  })
  it('проверка запроса', () => {
    expect(recoverPasswordReducer(initialStateForgotPass, { type: GET_PASSWORD_REQUEST }))
      .toEqual({
        emailRecoverSuccess: false,
        isLoading: true,
        success: false,
        isRequestSent: true,
        errorText: ''
      })
  })
  it('проверка успешного запроса', () => {
    expect(recoverPasswordReducer(initialStateForgotPass, { type: GET_PASSWORD_SUCCESS, recoverPasswordResponse }))
      .toEqual({
        isLoading: false,
        success: undefined,
        isRequestSent: false,
        emailRecoverSuccess: true, 
        errorText: ''
      })
  })
  it('проверка плохого запроса', () => {
    expect(recoverPasswordReducer(initialStateForgotPass, { type: GET_PASSWORD_FAILED, failedText  }))
      .toEqual({
        errorText: "Err",
        emailRecoverSuccess: false,
        errorText: undefined,
        isLoading: false,
        isRequestSent: false,
        success: false,
      })
  })
  it('очистка восстановления пароля', () => {
    expect(recoverPasswordReducer(initialStateForgotPass, { type: RECOVER_PASSWORD_CLEAN }))
      .toEqual({
        isLoading: false,
        success: false,
        isRequestSent: false,
        emailRecoverSuccess: false, 
        errorText: ''
      })
  })
  it('очистка состоягия', () => {
    expect(recoverPasswordReducer(initialStateForgotPass, { type: GET_PASSWORD_CLEAN }))
      .toEqual({
        isLoading: false,
        success: false,
        isRequestSent: false,
        emailRecoverSuccess: false, 
        errorText: ''
      })
  })
})
