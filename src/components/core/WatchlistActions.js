import './WatchlistActions.css';
const WatchlistActions = props => {
  return (
    <div className="wa-actions">
      <button className="wa-buy">BUY</button>
      <button className="wa-sell">SELL</button>
      <button
        className="wa-rm"
        onClick={() => props.doesUpdated(props.stockname)}
      >
        REMOVE FROM WATCHLIST
      </button>
    </div>
  );
};

export default WatchlistActions;
