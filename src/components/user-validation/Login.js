import axios from 'axios';
import { useRef,useState } from 'react';
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import { useHistory } from 'react-router-dom';
import classes from './UserValidation.module.css';
const LoginForm = () => {
  const history = useHistory();
  //Input Refs
  const usernameRef = useRef();
  const passwordRef = useRef();
  //Error Text - States
  const [userNameError,setUserNameError] = useState('');
  const [passwordError,setPasswordError] = useState('');
  //Auth Context
  const authContext = useContext(AuthContext);
  //Validating the input fields
  const validate = (username, password) => {
    var flag=0;
    if(username.length===0) {setUserNameError('Username is Required'); flag=1;}
    if(password.length===0) {setPasswordError('Password is Required'); flag=1;}
    if(flag===1) return false;
    return true;
  };
  //Form Submit Handler
  const submitHandler = async event => {
    event.preventDefault();
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    if(validate(username.trim(), password.trim())){
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
    }
  };
  return (
    <div>
      <form className={classes["login-form__user-validation"]} onSubmit={submitHandler}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            className={classes.username}
            ref={usernameRef}
          />
          <span className={classes.error}>{userNameError}</span>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className={classes.password}
            ref={passwordRef}
          />
          <span className={classes.error}>{passwordError}</span>
        </div>
        <button className={classes["login-btn"]}>LOGIN</button>
      </form>
    </div>
  );
};

export default LoginForm;
