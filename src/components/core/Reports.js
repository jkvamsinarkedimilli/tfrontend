import axios from 'axios';
import { useRef, useState } from 'react';
import './Reports.css';
const Reports = () => {
  var key = 0;
  const fromDateRef = useRef();
  const toDateRef = useRef();
  const [reports, setReports] = useState([]);
  const maxDate = new Date();
  var day = maxDate.getDate();
  var month = maxDate.getMonth() + 1;
  const year = maxDate.getFullYear();
  if (day < 10) {
    day = '0' + day;
  }
  if (month < 10) {
    month = '0' + month;
  }
  const mxDate = year + '-' + month + '-' + day;
  const getReports = async event => {
    event.preventDefault();
    console.log(fromDateRef.current.value);
    console.log(toDateRef.current.value);
    await axios
      .post(
        'http://localhost:3030/api/users/getreports',
        {
          username: localStorage.getItem('username'),
          fromDate: fromDateRef.current.value,
          toDate: toDateRef.current.value,
        },
        {
          headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
        }
      )
      .then(res => {
        console.log(res.data.message);
        setReports(res.data.message);
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <div className="container__reports">
      <div className="search__reports">
        <div className="picker__reports">
          <label>From</label>
          <input
            type="date"
            className="datepicker__reports"
            ref={fromDateRef}
            max={mxDate}
          />
        </div>
        <div className="picker__reports">
          <label>To</label>
          <input
            type="date"
            className="datepicker__reports"
            max={mxDate}
            ref={toDateRef}
          />
        </div>
        <button className="button__reports" onClick={getReports}>
          SEARCH
        </button>
      </div>
      <br />
      <hr />
      {reports.length !== 0 && (
        <div className="reports">
          <table className="reports-table">
            <thead>
              <tr>
                <th>Stock Name</th>
                <th>Type</th>
                <th>Price</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {reports.map(report => (
                <tr key={key++}>
                  <td>{report.stockName}</td>
                  <td>{report.quantity}</td>
                  <td>{report.mode}</td>
                  <td>{report.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Reports;
