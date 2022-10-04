import axios from 'axios';
import { useEffect, useState } from 'react';
import './Watchlist.css';
import WatchlistActions from './WatchlistActions';
const Watchlist = () => {
  const [message, setMessage] = useState([]);
  const [updated, setUpdated] = useState(0);
  const doesUpdated = stockname => {
    axios
      .post(
        'http://localhost:3030/api/users/removefromwatchlist/' + stockname,
        { username: localStorage.getItem('username') },
        {
          headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
        }
      )
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
    setUpdated(prev => {
      return prev + 1;
    });
    alert('Removed');
  };
  useEffect(() => {
    axios
      .post(
        'http://localhost:3030/api/users/getwatchlist',
        { username: localStorage.getItem('username') },
        {
          headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
        }
      )
      .then(res => {
        if (res.data.status === 'Success') {
          setMessage(res.data.message);
        } else if (res.data.status === 'No Stocks') {
          setMessage([]);
        }
      })
      .catch(err => {
        window.alert('An Error Occured');
      });
  }, [updated]);
  return (
    <div className="watchlist">
      <table className="watchlist-table">
        <thead>
          <tr>
            <th>Stock Name</th>
            <th>LTP</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {message.length === 0 && (
            <tr key="No Stocks">
              <td colSpan="3">No Stocks Added to Watchlist</td>
            </tr>
          )}
          {message.length > 0 &&
            message.map(stock => (
              <tr key={stock}>
                <td>{stock}</td>
                <td>LTP</td>
                <td>
                  <WatchlistActions
                    stockname={stock}
                    doesUpdated={doesUpdated}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Watchlist;
