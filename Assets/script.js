// First API QMC8KQNE4QT6DSGV"
//Second API FW5Y3HRYGFE5RA5A

const ApiKey = "FW5Y3HRYGFE5RA5A";
const ApiKey2 = "FW5Y3HRYGFE5RA5A";
const inputStockEl = document.getElementById('inputStock');
const favBtn = document.getElementById('favouriteButton');
const favStockList = document.getElementById('favouriteStocks');
const adviceBtn = document.getElementById('adviceBtn');
const newsDiv = document.getElementById('newsDiv');



// 1. Users types a company name in search bar
// 1.1 and gets the stock company name result from the drop-down list.
inputStockEl.addEventListener('input', searchStocks);

// 2. The user saves the selected stock in the Favourite List with the "Favourite Button"
document.addEventListener('DOMContentLoaded', function () {

const ul = document.querySelector('ul#favouriteStocks');
// function that deletes the share name from favourites list and from local storage
function deleteFromFavourites(eleToBeDeleted) {
let alredyExisFavs = localStorage.getItem("favoritesStored");
if (alredyExisFavs) {
alredyExisFavs = JSON.parse(alredyExisFavs);
}
//get the index of share to be deleted from local storage array and delete it
const index = alredyExisFavs.indexOf(eleToBeDeleted);
if (index > -1) {
alredyExisFavs.splice(index, 1);
}
$('ul').empty();
localStorage.setItem("favoritesStored", JSON.stringify(alredyExisFavs));
//displaying fresh list from local storage
createListFromLocalSTorage();
}

// Function to be called on load that displays favourites from local storage
createListFromLocalSTorage();

//Function that is used to create a list of shares into favourites bar from local storage
function createListFromLocalSTorage() {
let alredyExisFavs = localStorage.getItem("favoritesStored");
if (alredyExisFavs) {
alredyExisFavs = JSON.parse(alredyExisFavs);
} else {
alredyExisFavs = [];
}
for (let i = 0; i < alredyExisFavs.length; i++) {
const li = document.createElement('li');
li.classList.add('liElement');
li.textContent = alredyExisFavs[i];
li.addEventListener('click', function(e) {
if(e.target.tagName == 'LI') {
fetchStockData(alredyExisFavs[i]);
} 
})

//add delete button after each li element
let deleteButton = $('<i/>').text('delete_forever').addClass('material-icons delButton');
deleteButton.on('click', function(e) {
deleteFromFavourites(alredyExisFavs[i]);
})
deleteButton.appendTo(li);
ul.appendChild(li);
}
}

//Listener and function that adds share to the favourites list
document.getElementById('favouriteButton').addEventListener('click', function () {
let inputvalueentered = document.getElementById('inputStock').value;
let alredyExisFavs = localStorage.getItem("favoritesStored");
if (alredyExisFavs) {
alredyExisFavs = JSON.parse(alredyExisFavs);
} else {
alredyExisFavs = [];
}
$('ul#favouriteStocks').empty();

//Checking if its already in Favourites
if(alredyExisFavs.indexOf(inputvalueentered) == -1) {
alredyExisFavs.push(inputvalueentered);
}
localStorage.setItem("favoritesStored", JSON.stringify(alredyExisFavs));
createListFromLocalSTorage();
document.getElementById('inputStock').value = '';
});
});


// Function to fetch stock suggestions as the user types in the search bar
async function searchStocks(e) {
const searchText = e.target.value;

if (!searchText) {
return;
}

const response = await fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchText}&apikey=${ApiKey2}`);
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

// inputStockEl.parentElement.appendChild(suggestionList);
document.getElementById('suggestionsDisplay').appendChild(suggestionList);
}
}

// Function to fetch the stock information when the user clicks on
// a stock symbol from the Favourite List or search suggestions
function fetchStockData(stockSymbol) {
// clear existing rows of table before fetching new data
$("tr").remove(); 
$('#adviceBtn').addClass('show').removeClass('hide');
const apiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${stockSymbol}&interval=60min&apikey=${ApiKey}`;
fetch(apiUrl)
.then(response => response.json())
.then(data => {
if(data["Time Series (60min)"]) {
const timeSeries = data["Time Series (60min)"];

const stockSymbolDiv = document.querySelector('#stockSymbolDiv');
const analysisData = document.querySelector('#analysisData');
stockSymbolDiv.innerHTML = `
<h4>Stock: ${stockSymbol}</h4>
<h5>Hourly Analysis</h5>
`;
// create table that displays stock data
var table = document.createElement('table');

var tr = document.createElement('tr'); 
var td0 = document.createElement('td');
var td1 = document.createElement('td');
var td2 = document.createElement('td');
var td3 = document.createElement('td');
var td4 = document.createElement('td');
var td5 = document.createElement('td');

td0.appendChild(document.createTextNode('Time'));
td1.appendChild(document.createTextNode('Open'));
td2.appendChild(document.createTextNode('High'));
td3.appendChild(document.createTextNode('Low'));
td4.appendChild(document.createTextNode('Close'));
td5.appendChild(document.createTextNode('Volume'));
tr.appendChild(td0);
tr.appendChild(td1);
tr.appendChild(td2);
tr.appendChild(td3);
tr.appendChild(td4);
tr.appendChild(td5);

table.appendChild(tr);

const latestDate = Object.keys(timeSeries)[0];
const latestData = timeSeries[latestDate]; 
var tr = document.createElement('tr'); 
var td0 = document.createElement('td');
var td1 = document.createElement('td');
var td2 = document.createElement('td');
var td3 = document.createElement('td');
var td4 = document.createElement('td');
var td5 = document.createElement('td');
td0.appendChild(document.createTextNode(latestDate));
td1.appendChild(document.createTextNode(parseFloat(latestData["1. open"]).toFixed(2)));
td2.appendChild(document.createTextNode(parseFloat(latestData["2. high"]).toFixed(2)));
td3.appendChild(document.createTextNode(parseFloat(latestData["3. low"]).toFixed(2)));
td4.appendChild(document.createTextNode(parseFloat(latestData["4. close"]).toFixed(2)));
td5.appendChild(document.createTextNode(parseFloat(latestData["5. volume"]).toFixed(2)));
tr.appendChild(td0);
tr.appendChild(td1);
tr.appendChild(td2);
tr.appendChild(td3);
tr.appendChild(td4);
tr.appendChild(td5);
table.appendChild(tr);
analysisData.appendChild(table);

// Fetch news data after fetching the stock data
fetchNewsAndSentiment(stockSymbol);
}
})
.catch(error => console.log(error));
}

// Offer advice/recommendation to user
adviceBtn.addEventListener('click', createAdvice);
function createAdvice(){

// Get a random number between 0 and 1
const rand = Math.random();

// Get the advice div
const adviceDiv = document.getElementById('advice');

// Create a new h3 element
const advice = document.createElement('h3');

// Set the text of the h3 element based on the random number

if (rand < 0.33) {
advice.textContent = 'BUY!';
advice.style.color = 'green';
} else if (rand < 0.66) {
advice.textContent ='SELL!';
advice.style.color = 'red';
} else {
advice.textContent = 'HOLD!';
advice.style.color = 'blue';
}

// Remove any previously displayed advice
const previousAdvice = adviceDiv.querySelector('h3');
if (previousAdvice){
adviceDiv.removeChild(previousAdvice);
}
// Append the advice to the advice div

adviceDiv.appendChild(advice);

}
function fetchNewsAndSentiment(stockSymbol) {
const apiUrl = `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=${stockSymbol}&apikey=${ApiKey}`;

fetch(apiUrl)
.then(response => response.json())
.then(data => {
const newsDiv = document.querySelector('#newsDiv');
newsDiv.innerHTML = ''; // Clear out the current news

if (!data.feed || data.feed.length === 0) {
console.log('No News found');
return;
}

const newsItem = data.feed[0]; // Get the first news item

const newsElement = document.createElement('div');
newsElement.classList.add('news-item'); // Add class for styling

$('#newsDiv').addClass('show').removeClass('hide');

const headlineElementHeader = document.createElement('h4');
headlineElementHeader.textContent = "Trending News";
newsElement.appendChild(headlineElementHeader);


const headlineElement = document.createElement('h5');
headlineElement.textContent = newsItem.title;
newsElement.appendChild(headlineElement);

const timePublishedElement = document.createElement('p');
timePublishedElement.textContent = `Time Published: ${newsItem.time_published}`;
newsElement.appendChild(timePublishedElement);

const authorsElement = document.createElement('p');
authorsElement.textContent = `Authors: ${newsItem.authors.join(', ')}`;
newsElement.appendChild(authorsElement);

if (newsItem.banner_image) {
const imageElement = document.createElement('img');
imageElement.src = newsItem.banner_image;
imageElement.alt = newsItem.title;
imageElement.style.maxWidth = '200px'; // Limit image size
imageElement.style.maxHeight = '200px'; // Limit image size
newsElement.appendChild(imageElement);
}

const summaryElement = document.createElement('p');
summaryElement.textContent = `Summary: ${newsItem.summary}`;
newsElement.appendChild(summaryElement);

const urlElement = document.createElement('a');
urlElement.href = newsItem.url;
urlElement.target = '_blank'; // Open in a new tab
urlElement.textContent = 'Read More';
newsElement.appendChild(urlElement);

const sourceElement = document.createElement('p');
sourceElement.textContent = `Source: ${newsItem.source}`;
newsElement.appendChild(sourceElement);

newsDiv.appendChild(newsElement);
})
.catch(error => {
console.log(error);
});
}
