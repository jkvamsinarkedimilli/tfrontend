import './App.css';
import Header from './UI/Header';
import SubHeader from './UI/SubHeader';
import { Redirect, Route, Switch } from 'react-router-dom';
import Watchlist from './components/core/Watchlist';
import Portfolio from './components/core/Portfolio';
import Reports from './components/core/Reports';
import Market from './components/core/Market';
import Stock from './components/core/Stock';
import UserValidation from './components/user-validation/UserValidation';
import { useContext } from 'react';
import AuthContext from './context/AuthContext';
function App() {
  const authContext = useContext(AuthContext);
  return (
    <div className="App">
      <Header />
      <SubHeader />
      <Switch>
        <Route path="/" exact>
          <Market />
        </Route>
        <Route path="/user-verification">
          <UserValidation />
        </Route>
        {authContext.isLoggedIn && (
          <Route path="/watchlist">
            <Watchlist />
          </Route>
        )}
        {authContext.isLoggedIn && (
          <Route path="/portfolio">
            <Portfolio />
          </Route>
        )}
        {authContext.isLoggedIn && (
          <Route path="/reports">
            <Reports />
          </Route>
        )}
        {authContext.isLoggedIn && (
          <Route path="/stocks/:stockname">
            <Stock />
          </Route>
        )}
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
