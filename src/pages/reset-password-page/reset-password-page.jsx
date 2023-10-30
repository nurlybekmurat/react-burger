import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate  } from 'react-router-dom';
import { resetPassword } from '../../services/reset-password/actions';

export const ResetPasswordPage = () => {
  const [isPassType, setIsPassType] = useState(true);
  const [codeValue, setCodeValue] = useState('');
  const inputNameRef = useRef(null);
  const [passValue, setPassValue] = useState('');
  const inputPassRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { response, passwordResetRequest } = useSelector(state => state.resetPassword)
  const onPassIconClick = () => {
    setIsPassType(!isPassType);
  }

  const resetPasswordHandler = (e) => {
    e.preventDefault();
    dispatch(resetPassword(passValue, codeValue));
  }

  useEffect(()=> {
    if (response.success) {
      navigate('/profile')
    }
  }, [dispatch, response, navigate])

  return (
    <div className='PageWrapper'>
      <h1 className="text text_type_main-medium mb-4">
        Восстановление пароля
      </h1>
      <form className='Form' onSubmit={resetPasswordHandler}>
        <Input
          type={isPassType ? 'password' : 'text'}
          placeholder={'Введите новый пароль'}
          onChange={e => setPassValue(e.target.value)}
          icon={ isPassType ? 'ShowIcon' : 'HideIcon'}
          value={passValue}
          name={'password'}
          error={false}
          ref={inputPassRef}
          onIconClick={onPassIconClick}
          errorText={'Ошибка'}
          size={'default'}
          extraClass="mb-6"
        />
        <Input
          type={'text'}
          placeholder={'Введите код из письма'}
          onChange={e => setCodeValue(e.target.value)}
          value={codeValue}
          name={'code'}
          error={false}
          ref={inputNameRef}
          errorText={'Ошибка'}
          size={'default'}
          extraClass="mb-6"
        />
        <Button disabled={passwordResetRequest} htmlType="submit" type="primary" size="medium">
            Сохранить
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive mb-4 mt-20">
        Вспомнили пароль? <Link className="Link" to={'/login'}>Войти</Link>
      </p>
    </div>
  )
}