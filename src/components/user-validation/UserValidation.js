import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import NotFound from '../../UI/NotFound';
import LoginForm from './Login';
import RegisterForm from './Register';
import './UserValidation.css';
const UserValidation = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const verifyMethod = queryParams.get('method');
  const [isLogin, setIsLogin] = useState(false);
  return (
    <div className="uservalidation-form">
      {verifyMethod === 'login' && (
        <LoginForm isUserLogin={isLogin} setUserLogin={setIsLogin} />
      )}
      {verifyMethod === 'register' && <RegisterForm isUserLogin={isLogin} />}
      {verifyMethod !== 'login' && verifyMethod !== 'register' && <NotFound />}
    </div>
  );
};
export default UserValidation;
