import { useState, useRef, useEffect, FC, FormEvent } from 'react';
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate  } from 'react-router-dom';
import { resetPassword } from '../../services/reset-password/actions';
import { useAppDispatch, useAppSelector  } from '../../hooks/index';


export const ResetPasswordPage: FC = () => {
  const [isPassType, setIsPassType] = useState<boolean>(true);
  const [codeValue, setCodeValue] = useState<string>('');
  const inputNameRef = useRef<HTMLInputElement>(null);
  const [passValue, setPassValue] = useState<string>('');
  const inputPassRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { response, passwordResetRequest } = useAppSelector(state => state.resetPassword)
  const onPassIconClick = () => {
    setIsPassType(!isPassType);
  }

  const resetPasswordHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(resetPassword(passValue, codeValue));
  }

  useEffect(()=> {
    if (response && response.success) {
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