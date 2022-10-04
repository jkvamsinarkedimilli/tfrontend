import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import './SubHeader.css';
const SubHeader = () => {
  const authContext = useContext(AuthContext);
  return (
    <div>
      {authContext.isLoggedIn && (
        <div className="subheader">
          <ul className="ul-subheader">
            <li className="link-subheader">
              <NavLink to="/" activeClassName="active-subheader">
                Home
              </NavLink>
            </li>
            <li className="link-subheader">
              <NavLink activeClassName="active-subheader" to="/watchlist">
                Watchlist
              </NavLink>
            </li>
            <li className="link-subheader">
              <NavLink activeClassName="active-subheader" to="/portfolio">
                Portfolio
              </NavLink>
            </li>
            <li className="link-subheader">
              <NavLink activeClassName="active-subheader" to="/reports">
                Reports
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default SubHeader;
