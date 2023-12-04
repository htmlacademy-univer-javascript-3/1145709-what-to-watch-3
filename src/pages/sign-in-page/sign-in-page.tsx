import {Footer} from '../../components/footer/footer';
import {Header} from '../../components/header/header';
import {LoginForm} from '../../components/login-form/login-form.tsx';

function SignInPage(): JSX.Element {
  return (
    <div className="user-page">
      <Header/>

      <div className="sign-in user-page__content">
        <LoginForm/>
      </div>

      <Footer/>
    </div>
  );
}

export default SignInPage;
