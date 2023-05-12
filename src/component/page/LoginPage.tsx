import { Login } from '@/api/model/Login';
import {
  performAuth,
  registerSuccessfullLogin,
} from '@/api/service/AuthService';
import { loginState } from '@/api/service/recoil/atoms/loginAtoms';
import ENV from '@/constants/KeyManagerConstants';
import { useKmgrContext } from '@/provider/KmgrProvider';
import { Button } from 'primereact/button';
import { Messages } from 'primereact/messages';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

const LoginPage = (): JSX.Element => {
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
    <div className="container">
      <div className="container is-fluid">
        {<Messages ref={messages} />}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="field">
            <div className="control has-icons-left">
              <input
                {...register('login', { required: true })}
                className="input"
                type="text"
                name="login"
                placeholder={t('login.userField') ?? 'login.userField'}
              />
              <span className="icon is-small is-left">
                <i className="pi pi-user"></i>
              </span>
              {errors.login && <p>{t('validation.required')}</p>}
            </div>
          </div>
          <div className="field">
            <div className="control has-icons-left">
              <input
                {...register('password', { required: true })}
                className="input"
                type="password"
                name="password"
                placeholder={t('login.passField') ?? 'login.passField'}
              />
              <span className="icon is-small is-left">
                <i className="pi pi-lock"></i>
              </span>
              {errors.password && <p>{t('validation.required')}</p>}
            </div>
          </div>
          <div className="field is-grouped">
            <div className="control">
              <Button label={t('login.loginButton') ?? 'login.loginButton'} />
            </div>
            <div className="control">
              <Button
                label={t('login.registerButton') ?? 'login.registerButton'}
                className="p-button-success"
                onClick={() => console.log('TODO')}
                type="button"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
