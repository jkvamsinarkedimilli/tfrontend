import axios from 'axios';
import { useRef } from 'react';
import { useHistory } from 'react-router-dom';
const RegisterForm = props => {
  const history = useHistory();
  const usernameInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmpasswordInputRef = useRef();
  const validate = (username, password, confirmPassword) => {
    return;
  };
  const submitHandler = async event => {
    event.preventDefault();
    const username = usernameInputRef.current.value;
    const password = passwordInputRef.current.value;
    const confirmPassword = confirmpasswordInputRef.current.value;
    validate(username, password, confirmPassword);
    try {
      const res = await axios.post('http://localhost:3030/api/users/', {
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
      if (e.response.data.data.message.keyValue.username) {
        window.alert('Username already exists..please try with another one');
      }
    }
  };
  return (
    <div>
      <form className="register-form__user-validation" onSubmit={submitHandler}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            className="username"
            ref={usernameInputRef}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="password"
            ref={passwordInputRef}
          />
        </div>
        <div>
          <label htmlFor="cpassword">Confirm Password</label>
          <input
            type="password"
            id="cpassword"
            className="password"
            ref={confirmpasswordInputRef}
          />
        </div>
        <button className="login-btn">REGISTER</button>
      </form>
    </div>
  );
};

export default RegisterForm;
