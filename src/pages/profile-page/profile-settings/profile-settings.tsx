import { useState, useRef, useEffect, FC, RefObject, Dispatch, SetStateAction, FormEvent } from 'react';
import { getUserData } from '../../../services/user/selectors';
import { getCookie } from '../../../utils/utils';
import { getUserInfo, refreshUserInfo } from '../../../services/user/actions';
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppSelector, useAppDispatch  } from '../../../hooks/index';
import styles from './profile-settings.module.css';

export const ProfileSettings: FC = () => {
  const dispatch = useAppDispatch();  

  const {userName, userEmail} = useAppSelector(getUserData);
  const [isInputsDifferent, setIsInputsDifferent] = useState<boolean>(false);
  const [nameValue, setNameValue] = useState<string>(userName ? userName : '');
  const inputNameRef = useRef<HTMLInputElement>(null);
  const [emailValue, setEmailValue] = useState<string>(userEmail ? userEmail : '');
  const inputEmailRef = useRef<HTMLInputElement>(null);
  const [passValue, setPassValue] = useState<string>('');
  const inputPassRef = useRef<HTMLInputElement>(null);

  useEffect(()=> {
    dispatch(getUserInfo(getCookie('refreshToken')!));
    setNameValue(userName);
    setEmailValue(userEmail);
  }, [dispatch, userName, userEmail]);

  const onIconClick = (ref: RefObject<HTMLInputElement>) => {
    setTimeout(() => ref.current!.focus(), 0);
  }

  const inputHandler = (value: string, state: string, stateHandler: Dispatch<SetStateAction<string>>) => {
    stateHandler(value);
    if (state !== userName || state !== userEmail) {
      setIsInputsDifferent(true);
    }
  }

  const resetBtnHandler = () => {
    setNameValue(userName);
    setEmailValue(userEmail);
    setPassValue('');
    setIsInputsDifferent(false);
  }

  const saveBtnHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsInputsDifferent(false);
    dispatch(refreshUserInfo(nameValue, emailValue, passValue, getCookie('token')!));
  }

  return (
    <div>
      <form onSubmit={saveBtnHandler}>
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={e => inputHandler(e.target.value, nameValue, setNameValue)}
          onIconClick={() => {onIconClick(inputNameRef)}}
          value={nameValue}
          icon={'EditIcon'}
          name={'name'}
          error={false}
          ref={inputNameRef}
          errorText={'Ошибка'}
          size={'default'}
          extraClass="mb-6"
        />
        <Input
          type={'email'}
          placeholder={'E-mail'}
          onChange={e => inputHandler(e.target.value, emailValue, setEmailValue)}
          onIconClick={() => {onIconClick(inputEmailRef)}}
          value={emailValue}
          icon={ 'EditIcon'}
          name={'email'}
          error={false}
          ref={inputEmailRef}
          errorText={'Ошибка'}
          size={'default'}
          extraClass="mb-6"
        />
        <Input
          type={'password'}
          placeholder={'Пароль'}
          onChange={e => inputHandler(e.target.value, passValue, setPassValue)}
          onIconClick={() => {onIconClick(inputPassRef)}}
          icon={ 'EditIcon'}
          value={passValue}
          name={'password'}
          error={false}
          ref={inputPassRef}
          errorText={'Ошибка'}
          size={'default'}
          extraClass="mb-6"
        />
        { isInputsDifferent &&
          <div className={styles.ButtonWrapper}>
            <Button onClick={resetBtnHandler} htmlType="button" type="secondary" size="medium">
              Отмена
            </Button>
            <Button htmlType="submit" type="primary" size="medium">
              Сохранить
            </Button>
          </div>
        }
      </form>
    </div>
  )
}