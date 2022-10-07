import axios from 'axios';
import { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import classes from './UserValidation.module.css';
const RegisterForm = props => {
  const history = useHistory();
  //Input refs
  const usernameInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmpasswordInputRef = useRef();
  //Error Text - States
  const [userNameError,setUserNameError] = useState('');
  const [passwordError,setPasswordError] = useState('');
  const [confirmPasswordError,setConfirmPasswordError] = useState('');
  //Validating the Input Fields
  const validate = (username, password, confirmPassword) => {
    var flag=0;
    if(username.length===0) {setUserNameError('Username is required'); flag=1;}
    if(password.length===0) {setPasswordError('Password is required'); flag=1;}
    if(confirmPassword.length===0) {setConfirmPasswordError('Confirm Password is required'); flag=1;}
    if(username.length<6) {setUserNameError('Min Length of username should be 6'); flag=1;}
    if(password.length<8) {setPasswordError('Min Length of password should be 8'); flag=1;}
    if(password!==confirmPassword && confirmPassword.length!==0) {setConfirmPasswordError('Password and Confirm Password should be same'); flag=1;}

    if(flag===1) return false;
    return true;
  };
  //Form Submit Handler
  const submitHandler = async event => {
    event.preventDefault();
    const username = usernameInputRef.current.value;
    const password = passwordInputRef.current.value;
    const confirmPassword = confirmpasswordInputRef.current.value;
    if(validate(username.trim(), password.trim(), confirmPassword.trim())){
      try {
        const res = await axios.post('http://localhost:3030/api/users/register', {
          username,
          password,
        });
        if (res.data.status === 'Success') {
          window.alert(
            'Registration Success...Redirecting to Login, Click OK to continue'
          );
          history.replace('user-verification?method=login');
        }
      } catch (e) {
        console.log(e);
        if (e.response.data.data.message.keyValue.username) {
          window.alert('Username already exists..please try with another one');
        }
      }
    }
  };
  return (
    <div>
      <form className={classes["register-form__user-validation"]} onSubmit={submitHandler}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            className={classes.username}
            ref={usernameInputRef}
          />
          <span className={classes.error}>{userNameError}</span>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className={classes.password}
            ref={passwordInputRef}
          />
          <span className={classes.error}>{passwordError}</span>
        </div>
        <div>
          <label htmlFor="cpassword">Confirm Password</label>
          <input
            type="password"
            id="cpassword"
            className={classes.password}
            ref={confirmpasswordInputRef}
          />
          <span className={classes.error}>{confirmPasswordError}</span>
        </div>
        <button className={classes["login-btn"]}>REGISTER</button>
      </form>
    </div>
  );
};

export default RegisterForm;
