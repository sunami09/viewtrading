# Trading View Project

This project provides a comprehensive trading view dashboard, allowing users to search for and view detailed information about stocks, cryptocurrencies, and other financial instruments.

🌐 [**Live Site**](https://viewtrading.netlify.app/)


## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Code Snippets](#code-snippets)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Search Functionality**: Allows users to search for financial instruments using ticker symbols.
- **Detailed Views**: Displays comprehensive information about the selected instrument, including CEO, headquarters, industry, description, and more.
- **Error Handling**: Gracefully handles errors and provides user-friendly error messages.

<p align="center">
  <img src="https://github.com/sunami09/viewtrading/assets/66564001/53b2b463-aac3-4a1b-8dc3-f639cb3b7c3f" >
</p>



## Installation

```bash
git clone https://github.com/yourusername/trading-view.git
cd trading-view
npm install
npm start
```

## Usage

1. Open the application in your browser.
2. Use the search bar to enter the ticker symbol of the financial instrument you're interested in.
3. View detailed information about the instrument.


## Code Snippets

### Handling API Keys

To keep API keys secure, we use environment variables:

```javascript
const API_KEY = process.env.REACT_APP_API_KEY;
```

This ensures that the API key is not exposed in the code and can be securely managed.

### Formatting Market Cap

To present large numbers in a user-friendly format:

```javascript
function formatMarketCap(value) {
  if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`;
  if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
  if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
  if (value >= 1e3) return `$${(value / 1e3).toFixed(2)}K`;
  return `$${value}`;
}
```

### Error Handling

To handle errors gracefully:

```javascript
try {
  // API call or other operations
} catch (error) {
  console.error("An error occurred:", error.message);
}
```

### Truncating Descriptions

To ensure descriptions are concise and user-friendly:

```javascript
function truncateDescription(desc) {
  const words = desc.split(' ');
  if (words.length > 70) {
    return words.slice(0, 70).join(' ') + '...';
  }
  return desc;
}
```

### Searching for a Ticker Symbol

To search for a financial instrument using its ticker symbol:

```javascript
function searchTicker(symbol) {
  fetch(`https://api.example.com/search?symbol=${symbol}&apikey=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
      // Handle the data
    })
    .catch(error => {
      console.error("Error fetching data:", error);
    });
}
```

## API Explanation

Our project relies on the Financial Modeling Prep API to fetch financial data. This API provides a wealth of information about stocks, cryptocurrencies, and other financial instruments.

### Requesting Stock Data

To fetch data for a specific stock, we make a GET request to the API's `quote` endpoint:

```javascript
const symbol = "AAPL"; // Example for Apple Inc.
fetch(`https://api.financialmodelingprep.com/api/v3/quote/${symbol}?apikey=${API_KEY}`)
  .then(response => response.json())
  .then(data => {
    // Handle the data
  })
  .catch(error => {
    console.error("Error fetching stock data:", error);
  });
```

### Sample JSON Response

Here's an example of the JSON response when querying for Apple Inc.:

```json
[
  {
    "symbol": "AAPL",
    "name": "Apple Inc.",
    "price": 150.12,
    "changesPercentage": 0.58,
    "change": 0.87,
    "marketCap": 2485170000000,
    "exchange": "NASDAQ",
    "industry": "Computer Hardware",
    "description": "Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide. It also sells various related services.",
    "ceo": "Tim Cook",
    ...
  }
]
```

This response provides a wealth of information about the stock, including its current price, market capitalization, and a brief description.


## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
