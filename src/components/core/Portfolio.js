import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Portfolio.css';
const Portfolio = () => {
  const [portfolio, setPortfolio] = useState([]);
  useEffect(() => {
    axios
      .post(
        'http://localhost:3030/api/users/getPortfolio',
        {
          username: localStorage.getItem('username'),
        },
        {
          headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
        }
      )
      .then(res => {
        if (res.data.status === 'Success') {
          console.log(res);
          setPortfolio(prev => {
            return res.data.portfolio;
          });
        }
      })
      .catch(err => {
        console.log(err);
        // alert('An Error Occcuerd, please try after sometime');
      });
  }, []);
  return (
    <div className="portfolio">
      {portfolio.map(stock => (
        <Link
          className="portfolio-item"
          key={stock.stockName}
          to={`/stocks/${stock.stockName}`}
        >
          <div className="stock-details__pf">
            <h4>{stock.stockName}</h4>
            <span>{stock.ltp}</span>
          </div>
          <div className="stock-details__pf">
            <h4>Quantity</h4>
            <span>{stock.quantity}</span>
          </div>
          <div className="pl-details__pf">
            <h4>{stock.averagePrice}</h4>
            <span>
              {(
                ((stock.ltp - stock.averagePrice) / stock.averagePrice) *
                100
              ).toFixed(2)}{' '}
              %
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Portfolio;
