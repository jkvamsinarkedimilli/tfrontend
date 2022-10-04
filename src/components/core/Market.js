import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import axios from 'axios';
import './Market.css';
const Market = () => {
  const authContext = useContext(AuthContext);
  const [results, setResults] = useState([]);
  const [stockName, setStockName] = useState('');
  const stockNameChangeHandler = event => {
    setStockName(event.target.value.trim());
  };
  const stocks10 = [
    'RELIANCE',
    'TCS',
    'HDFCBANK',
    'INFY',
    'HINDUNILVR',
    'ICICIBANK',
    'SBIN',
    'HDFC',
    'ITC',
    'AIRTEL',
    'BAJFINANCE',
    'KOTAKBANK',
  ];

  useEffect(() => {
    if (stockName.length === 0) {
      setResults([<div key="nr">No Results Found</div>]);
      return;
    }
    const i = setTimeout(() => {
      axios
        .post(`http://localhost:3030/api/stocks/${stockName}`)
        .then(res => {
          setResults(
            res.data.message.map(stock => {
              return (
                <div className="stock-res-styling" key={stock.SYMBOL}>
                  <Link
                    to={`/stocks/${stock.SYMBOL}`}
                    className="link-style__market"
                  >
                    {stock.COMPANY_NAME} ({stock.SYMBOL})
                  </Link>
                </div>
              );
            }),
            ...results
          );
        })
        .catch(err => {
          console.log(err);
        });
    }, 500);
    return () => {
      clearTimeout(i);
    };
  }, [stockName]);
  useEffect(() => {
    setResults([<div key="nr"></div>]);
  }, []);
  return (
    <div>
      {!authContext.isLoggedIn && (
        <p style={{ color: 'red', margin: '2rem', fontWeight: 'bold' }}>
          Login to see the full Details
        </p>
      )}
      <div className="search-stock-market">
        <div className="market-content">
          <input
            type="text"
            placeholder="Search for a Stock"
            className="search-market"
            onChange={stockNameChangeHandler}
          />
          <div className="search-results">{results}</div>
          <div className="stock-results-market">
            <div className="stock-res-market">
              <h3 className="set-title">Top Stocks</h3>
              <div className="stocks-list">
                {stocks10.map(stock => (
                  <div key={stock}>
                    <Link to={`/stocks/${stock}`} className="stock-link">
                      <div className="stock-link-div">{stock}</div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Market;

// axios
//   .post(`http://localhost:3030/api/stocks/${stockName}`)
//   .then(res => {
//     var stocks = res.data.message;
//     var classStyle = 'stock-res-styling';
//     stocks.map(stock => {
//       var stockDiv = document.createElement('div');
//       const stockSymbol = stock.SYMBOL;
//       const companyName = stock.COMPANY_NAME;
//       stockDiv.className = classStyle;
//       stockDiv.innerHTML = (
//         <Link to={`/stocks/${stockSymbol}`}>{stockSymbol.value}</Link>
//       );
//       stockRes.appendChild(stockDiv);
//     });
//   })
//   .catch(err => {
//     console.log(err);
//   });
