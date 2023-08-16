var resultTextEl = document.querySelector('#result-text');
var resultContentEl = document.querySelector('#result-content');
var searchFormEl = document.querySelector('#search-input');

var one = document.querySelector('#one');
var two = document.querySelector('#two');
var three = document.querySelector('#three');
var four = document.querySelector('#four');
var five = document.querySelector('#five');

var wicon1 = document.querySelector('#wicon1');
var wicon2 = document.querySelector('#wicon2');
var wicon3 = document.querySelector('#wicon3');
var wicon4 = document.querySelector('#wicon4');
var wicon5 = document.querySelector('#wicon5');

function populate(res) {

  one.innerHTML = `
  Temperature: ` + res.list[0].main.temp + `K \n
  Humidty: ` + res.list[0].main.humidity + ` \n
  Wind Speed: ` + res.list[0].wind.speed + ` \n
  `;
  wicon1.src = "http://openweathermap.org/img/w/" + res.list[0].weather[0].icon + ".png";

  two.innerHTML = `
  Temperature: ` + res.list[9].main.temp + `K \n
  Humidity: ` + res.list[9].main.humidity + ` \n
  Wind Speed: ` + res.list[9].wind.speed + ` \n
  `;
  wicon2.src = "http://openweathermap.org/img/w/" + res.list[9].weather[0].icon + ".png";

  three.innerHTML = `
  Temperature: ` + res.list[19].main.temp + `K \n
  Humidity: ` + res.list[19].main.humidity + ` \n
  Wind Speed: ` + res.list[19].wind.speed + ` \n
  `;
  wicon3.src = "http://openweathermap.org/img/w/" + res.list[19].weather[0].icon + ".png";
  
  four.innerHTML = `
  Temperature: ` + res.list[29].main.temp + `K \n
  Humidity: ` + res.list[29].main.humidity + ` \n
  Wind Speed: ` + res.list[29].wind.speed + ` \n
  `;
  wicon4.src = "http://openweathermap.org/img/w/" + res.list[29].weather[0].icon + ".png";

  five.innerHTML = `
  Temperature: ` + res.list[39].main.temp + `K \n
  Humidity: ` + res.list[39].main.humidity + ` \n
  Wind Speed: ` + res.list[39].wind.speed + ` \n
  `;
  wicon5.src = "http://openweathermap.org/img/w/" + res.list[39].weather[0].icon + ".png";

  // {"cod":"200","message":0,"cnt":40,"list":[{
                                          // "dt":1692133200,"main":{
                                                                  //"temp":299.99,"feels_like":300.71,"temp_min":299.99,"temp_max":300.5,"pressure":1015,"sea_level":1015,"grnd_level":1000,"humidity":55,"temp_kf":-0.51}
                                                        //  ,"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04d"}],"clouds":{"all":54}
                                                        //  ,"wind":{"speed":4.21,"deg":335,"gust":4.48},"visibility":10000,"pop":0,"sys":{"pod":"d"},"dt_txt":"2023-08-15 21:00:00"},{"dt":1692144000,"main":

}

function getParams() {
  // Get the search params out of the URL (i.e. `?q=london&format=photo`) and convert it to an array (i.e. ['?q=london', 'format=photo'])
  var searchParamsArr = document.location.search.split('&');

  // Get the query and format values
  // var query = searchParamsArr[0].split('=').pop();
  // var format = searchParamsArr[1].split('=').pop();

  searchApi(query, format);
}

function printResults(resultObj) {
  console.log(resultObj);

  // set up `<div>` to hold result content
  var resultCard = document.createElement('div');
  resultCard.classList.add('card', 'bg-light', 'text-dark', 'mb-3', 'p-3');

  var resultBody = document.createElement('div');
  resultBody.classList.add('card-body');
  resultCard.append(resultBody);

  var titleEl = document.createElement('h3');
  titleEl.textContent = resultObj.title;

  var bodyContentEl = document.createElement('p');
  bodyContentEl.innerHTML =
    '<strong>Date:</strong> ' + resultObj.date + '<br/>';

  if (resultObj.subject) {
    bodyContentEl.innerHTML +=
      '<strong>Subjects:</strong> ' + resultObj.subject.join(', ') + '<br/>';
  } else {
    bodyContentEl.innerHTML +=
      '<strong>Subjects:</strong> No subject for this entry.';
  }

  if (resultObj.description) {
    bodyContentEl.innerHTML +=
      '<strong>Description:</strong> ' + resultObj.description[0];
  } else {
    bodyContentEl.innerHTML +=
      '<strong>Description:</strong>  No description for this entry.';
  }

  var linkButtonEl = document.createElement('a');
  linkButtonEl.textContent = 'Read More';
  linkButtonEl.setAttribute('href', resultObj.url);
  linkButtonEl.classList.add('btn', 'btn-dark');

  resultBody.append(titleEl, bodyContentEl, linkButtonEl);

  resultContentEl.append(resultCard);
}

function searchApi(city=searchFormEl.value) {
  const key = "50f513c64c94131d0d46b99d505ac278";
  fetch("https://api.openweathermap.org/geo/1.0/direct?q=" + city + ",US&limit=5&appid=" + key)
    .then((response) => response.json())
    .then(function (res) {
      // resultTextEl.textContent = res.search.query;
      console.log(res);
      // resultContentEl.textContent = '';
      const url = "https://api.openweathermap.org/data/2.5/forecast?lat=" + res[0].lat + "&lon=" + res[0].lon + "&appid=" + key;
      fetch(url)
        .then((response) => response.json())
        .then(function (response) {
          console.log(url);
          console.log(response);
          populate(response);
          return response;
        });
    })
    .catch(function (error) {
      console.error(error);
    });
}







// function handleSearchFormSubmit(event) {
//   event.preventDefault();

//   var searchInputVal = document.querySelector('#search-input').value;
//   //var formatInputVal = document.querySelector('#format-input').value;

//   if (!searchInputVal) {
//     console.error('You need a search input value!');
//     return;
//   }

//   searchApi(searchInputVal, formatInputVal);
// }

// searchFormEl.addEventListener('submit', handleSearchFormSubmit);

// getParams();
