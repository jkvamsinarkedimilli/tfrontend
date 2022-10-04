import axios from 'axios';
import { useRef } from 'react';
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import { useHistory } from 'react-router-dom';

const LoginForm = () => {
  const history = useHistory();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const authContext = useContext(AuthContext);
  const validate = (username, password) => {
    return;
  };
  const submitHandler = async event => {
    event.preventDefault();
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    validate(username, password);
    try {
      const res = await axios.post('http://localhost:3030/api/users/login', {
        username,
        password,
      });
      if (res.data.message === 'Login Success') {
        window.alert('Login Successful');
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('username', username);
        authContext.login(res.data.token);
        history.replace('/watchlist');
      }
    } catch (e) {
      if (e.response.data.message) {
        window.alert(
          'Entered details are invalid..please enter the valid details'
        );
      }
    }
  };
  return (
    <div>
      <form className="login-form__user-validation" onSubmit={submitHandler}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            className="username"
            ref={usernameRef}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="password"
            ref={passwordRef}
          />
        </div>
        <button className="login-btn">LOGIN</button>
      </form>
    </div>
  );
};

export default LoginForm;
