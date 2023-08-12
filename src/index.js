import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
// [ {
//   "symbol" : "AAPL",
//   "name" : "Apple Inc.",
//   "price" : 149.55000000,
//   "changesPercentage" : 0.38934135,
//   "change" : 0.58000183,
//   "dayLow" : 148.75000000,
//   "dayHigh" : 151.41000000,
//   "yearHigh" : 157.26000000,
//   "yearLow" : 103.10000000,
//   "marketCap" : 2472091320320.00000000,
//   "priceAvg50" : 149.04265000,
//   "priceAvg200" : 134.71935000,
//   "volume" : 97750498,
//   "avgVolume" : 78489468,
//   "exchange" : "NASDAQ",
//   "open" : 150.63000000,
//   "previousClose" : 148.97000000,
//   "eps" : 5.10800000,
//   "pe" : 29.27760500,
//   "earningsAnnouncement" : "2021-07-27T16:30:00.000+0000",
//   "sharesOutstanding" : 16530199400,
//   "timestamp" : 1631575899
// } ]