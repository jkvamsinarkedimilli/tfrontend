import { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import './Header.css';
const Header = () => {
  const history = useHistory();
  const authContext = useContext(AuthContext);
  const logoutHandler = () => {
    authContext.logout();
    history.replace('/user-verification?method=login');
    localStorage.clear();
  };
  const isLoggedIn = authContext.isLoggedIn;
  return (
    <div className="navbar">
      <div className="nav-title"></div>
      <nav className="nav-links">
        {!isLoggedIn && (
          <ul className="links">
            <li className="link">
              <Link to="/user-verification?method=login">Login</Link>
            </li>
            <li className="link">
              <Link to="/user-verification?method=register">Register</Link>
            </li>
          </ul>
        )}
        {isLoggedIn && (
          <ul className="links">
            <li className="link">
              <Link to="/user-verification?method=login">Profile</Link>
            </li>
            <li className="link">
              <button className="logout-button" onClick={logoutHandler}>
                <Link to="/user-verification?method=register">Logout</Link>
              </button>
            </li>
          </ul>
        )}
      </nav>
    </div>
  );
};

export default Header;
