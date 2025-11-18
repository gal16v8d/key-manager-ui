import { Login } from '@/api/model/Login';
import {
  performAuth,
  registerSuccessfullLogin,
} from '@/api/service/AuthService';
import { loginState } from '@/api/service/recoil/atoms/loginAtoms';
import ENV from '@/constants/KeyManagerConstants';
import { useKmgrContext } from '@/provider/KmgrContext';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Messages } from 'primereact/messages';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import type { ReactElement } from 'react';
import './LoginPage.css';

const LoginPage = (): ReactElement => {
  const { t, message: messages } = useKmgrContext();
  const navigate = useNavigate();
  const setLoginData = useSetRecoilState(loginState);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Login>();

  const showMessage = (summary: string, message: string) => {
    messages?.current?.show({
      life: ENV.MSG_LIFE,
      severity: 'error',
      summary: `${summary}`,
      detail: message,
    });
  };

  const onSubmit = async (userLogin: Login) => {
    await performAuth(userLogin)
      .then((response) => {
        registerSuccessfullLogin(response?.data?.token ?? '');
        setLoginData(userLogin?.login ?? '');
        navigate(ENV.ROUTES.ACCOUNTS);
      })
      .catch(() => {
        showMessage('Error: ', t('login.errorLogin'));
      });
  };

  return (
    <div className="login-form-container">
      {<Messages ref={messages} />}
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <span className="icon is-small is-left">
            <i className="pi pi-user"></i>
          </span>
          <InputText
            {...register('login', { required: true })}
            className="input"
            type="text"
            name="login"
            placeholder={t('login.userField') ?? 'login.userField'}
          />
          {errors.login && <p>{t('validation.required')}</p>}
        </div>
        <div className="form-group">
          <span className="icon is-small is-left">
            <i className="pi pi-lock"></i>
          </span>
          <InputText
            {...register('password', { required: true })}
            className="input"
            type="password"
            name="password"
            placeholder={t('login.passField') ?? 'login.passField'}
          />
          {errors.password && <p>{t('validation.required')}</p>}
        </div>
        <div className="button-container">
          <Button
            label={t('login.loginButton') ?? 'login.loginButton'}
            className="p-button-success"
          />
          <Button
            label={t('login.registerButton') ?? 'login.registerButton'}
            className="p-button-success"
            onClick={() => console.log('TODO')}
            type="button"
          />
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
