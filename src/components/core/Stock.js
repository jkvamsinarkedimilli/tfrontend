import axios from 'axios';
import { useRef } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import './Stock.css';
const Stock = () => {
  const [showBuy, setShowBuy] = useState(false);
  const [showSell, setShowSell] = useState(false);
  const params = useParams();
  const stock = params.stockname;
  const buyStockQuanity = useRef();
  const buyStockPrice = useRef();
  const sellStockQuantity = useRef();
  const sellStockPrice = useRef();
  const headers = {
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  };
  const showBuyDiv = () => {
    setShowBuy(true);
    setShowSell(false);
  };
  const showSellDiv = () => {
    setShowSell(true);
    setShowBuy(false);
  };
  const placeBuyOrder = async () => {
    await axios
      .post(
        'http://localhost:3030/api/users/portfolio/BUY/' + stock,
        {
          username: localStorage.getItem('username'),
          price: buyStockPrice.current.value,
          quantity: buyStockQuanity.current.value,
        },
        {
          headers: headers,
        }
      )
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };
  const placeSellOrder = async () => {
    await axios
      .post(
        'http://localhost:3030/api/users/portfolio/SELL/' + stock,
        {
          username: localStorage.getItem('username'),
          price: sellStockPrice.current.value,
          quantity: sellStockQuantity.current.value,
        },
        {
          headers: headers,
        }
      )
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };
  const addToWatchlist = async () => {
    await axios
      .post(
        'http://localhost:3030/api/users/addtowatchlist/' + stock,
        { username: localStorage.getItem('username') },
        {
          headers,
        }
      )
      .then(res => {
        if (res.data.status === 'Success') {
          window.alert('Added to Watchlist');
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <div className="stock-result__stock">
      <div className="stock-details__stock">
        <p>Stock Name: {params.stockname}</p>
        <p>Stock Price: StockPrice</p>
      </div>
      <div className="stock-details__actions">
        <button className="buy-btn" onClick={showBuyDiv}>
          BUY
        </button>
        <button className="sell-btn" onClick={showSellDiv}>
          SELL
        </button>
        <button className="watchlist-btn" onClick={addToWatchlist}>
          ADD TO WATCHLIST
        </button>
      </div>
      <div className="stock-actions__stock">
        {showBuy && (
          <div className="stocks-orders">
            <input
              type="number"
              placeholder="Enter Quantity"
              ref={buyStockQuanity}
            />
            <input
              type="number"
              placeholder="Enter Price"
              ref={buyStockPrice}
            />
            <button onClick={placeBuyOrder}>BUY</button>
          </div>
        )}
        {showSell && (
          <div className="stocks-orders">
            <input
              type="number"
              placeholder="Enter Quantity"
              ref={sellStockQuantity}
            />
            <input
              type="number"
              placeholder="Enter Price"
              ref={sellStockPrice}
            />
            <button onClick={placeSellOrder}>SELL</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Stock;
