const ApiKey = "QMC8KQNE4QT6DSGV";
const inputStockEl = document.getElementById('inputStock');
const favBtn = document.getElementById('favouriteButton');
const favStockList = document.getElementById('favouriteStocks');
const adviceBtn = document.getElementById('adviceBtn');



// 1. Users types a company name in search bar
// 1.1 and gets the stock company name result from the drop-down list.
inputStockEl.addEventListener('input', searchStocks);

// 2. The user saves the selected stock in the Favourite List with the "Favourite Button"
document.addEventListener('DOMContentLoaded', function () {
    let alredyExisFavs = localStorage.getItem("favoritesStored");
    if (alredyExisFavs) {
        alredyExisFavs = JSON.parse(alredyExisFavs);
    } else {
        alredyExisFavs = [];
    }

    const ul = document.querySelector('ul');
    for (let i = 0; i < alredyExisFavs.length; i++) {
        const li = document.createElement('li');
        li.classList.add('liElement');
        li.textContent = alredyExisFavs[i];
        li.addEventListener("click", () => fetchStockData(alredyExisFavs[i])); // Fetch stock data when clicked
        ul.appendChild(li);
    }

    document.getElementById('favouriteButton').addEventListener('click', function () {
        let inputvalueentered = document.getElementById('inputStock').value;

        let alredyExisFavs = localStorage.getItem("favoritesStored");
        if (alredyExisFavs) {
            alredyExisFavs = JSON.parse(alredyExisFavs);
        } else {
            alredyExisFavs = [];
        }

        alredyExisFavs.push(inputvalueentered);

        localStorage.setItem("favoritesStored", JSON.stringify(alredyExisFavs));

        const li = document.createElement('li');
        li.classList.add('liElement');
        li.textContent = inputvalueentered;
        li.addEventListener("click", () => fetchStockData(inputvalueentered)); // Fetch stock data when clicked
        ul.appendChild(li);

        document.getElementById('inputStock').value = '';
    });
});


// Function to fetch stock suggestions as the user types in the search bar
async function searchStocks(e) {
    const searchText = e.target.value;

    if (!searchText) {
        return;
    }

    const response = await fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchText}&apikey=${ApiKey}`);
    const data = await response.json();
    const suggestions = data.bestMatches;

    // Clear previous suggestions
    const suggestionList = document.getElementById("suggestionList");
    if (suggestionList) {
        suggestionList.remove();
    }

    // Create new suggestions
    if (suggestions && suggestions.length > 0) {
        const suggestionList = document.createElement("ul");
        suggestionList.id = "suggestionList";

        suggestions.forEach((suggestion) => {
            const li = document.createElement("li");
            li.textContent = `${suggestion["1. symbol"]} - ${suggestion["2. name"]}`;
            li.onclick = () => {
                inputStockEl.value = suggestion["1. symbol"];
                fetchStockData(suggestion["1. symbol"]); // Fetch stock data when a suggestion is clicked
                suggestionList.remove();
            };

            suggestionList.appendChild(li);
        });

        inputStockEl.parentElement.appendChild(suggestionList);
    }
}

// Function to fetch the stock information when the user clicks on
// a stock symbol from the Favourite List or search suggestions
function fetchStockData(stockSymbol) {
    const apiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${stockSymbol}&interval=5min&apikey=${ApiKey}`;
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const timeSeries = data["Time Series (5min)"];
        const latestDate = Object.keys(timeSeries)[0];
        const latestData = timeSeries[latestDate];
        const stockInfoEl = document.querySelector('.col.s9');
        stockInfoEl.innerHTML = `
          <h3>${stockSymbol}</h3>
          <p>Date: ${latestDate}</p>
          <p>Open: ${latestData["1. open"]}</p>
          <p>High: ${latestData["2. high"]}</p>
          <p>Low: ${latestData["3. low"]}</p>
          <p>Close: ${latestData["4. close"]}</p>
          <p>Volume: ${latestData["5. volume"]}</p>
        `;
      })
      .catch(error => console.log(error));
  
  
  
    // Offer advice/recommendation to user
    document.addEventListener.on('click', 'advice');
    
    function createAdvice(recommendation){
        const rand = Math.random();
        if (rand < 0.33) {
        document.createElement = "<h3>Buy!</h3>";
        } else if (rand < 0.66) {
        document.createElement = "<h3>Sell!</h3>";
        } else {
        document.createElement = "<h3>Hold!</h3>";
        }
    }
    
  }
  