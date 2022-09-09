let now = new Date();
let currentHour = now.getHours();
if (currentHour < 10) {
  currentHour = `0${currentHour}`;
}
let currentMinutes = now.getMinutes();
if (currentMinutes < 10) {
  currentMinutes = `0${currentMinutes}`;
}
let currentDay = now.getDay();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let todaysDate = document.querySelector("h4");
todaysDate.innerHTML = `${days[currentDay]} ${currentHour}:${currentMinutes}`;

function handleSubmit(event) {
  event.preventDefault();
  let newCity = document.querySelector("#city-bar").value;
  searchCity(newCity);
}

function searchCity(newCity) {
  let apiKey = `b9b01b314c8b7bd51fdfba206fbf2d6a`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${newCity}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCityForecast);
}

function showCityForecast(response) {
  let iconElement = document.querySelector("#weather-icon");

  document.querySelector("#display-city").innerHTML = response.data.name;
  document.querySelector("#display-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#display-feel").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#display-wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#display-humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#description").innerHTML = response.data.weather[0].description;
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  celsiusTemp = response.data.main.temp;

  getForecast(response.data.coord);
}

function getForecast(coordinates) {
  console.log(coordinates);

  let apiKey = `b9b01b314c8b7bd51fdfba206fbf2d6a`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data);
  let forecastElement = document.querySelector("#forecast");
  
  let forecastHTML = `<div class="row ">`;

  let days = ["Friday", "Saturday", "Sunday", "Monday", "Tuesday"];
  
  days.forEach(function(day) {
    forecastHTML =
      forecastHTML +
      `    
        <div class="row forecast-next-day">
          <div class="col-6">
              ${day}
          </div>
          <div class="col-4 forecast-temperature">
            23°C
          </div>
          <div class="col-2">
            <img 
            class="forecast-weather"
            src="https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png"
            alt="clouded sun"
            />
          </div>
        </div>
      `;
  })
  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}

function showCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchPosition);
}

function searchPosition(position) {
  let apiKey = `b9b01b314c8b7bd51fdfba206fbf2d6a`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCityForecast);
}

function displayFahrenheitTemp(event) {
  event.preventDefault;
  let displayTemp = document.querySelector("#display-temp");
  let displayFeelingTemp = document.querySelector("#display-feel");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  displayTemp.innerHTML = Math.round(fahrenheitTemp);
  displayFeelingTemp.innerHTML = Math.round(fahrenheitTemp);
}

function displayCelsiusTemp(event) {
  event.preventDefault;
  let displayTemp = document.querySelector("#display-temp");
  let displayFeelingTemp = document.querySelector("#display-feel");
  displayTemp.innerHTML = Math.round(celsiusTemp);
  displayFeelingTemp.innerHTML = Math.round(celsiusTemp);
}


let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", handleSubmit);

let currentLocationBtn = document.querySelector("#current-location");
currentLocationBtn.addEventListener("click", showCurrentLocation);

let fahrenheitLink = document.querySelector("#fahrenheit-symbol");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-symbol");
celsiusLink.addEventListener("click", displayCelsiusTemp);

let celsiusTemp = null;

searchCity("Ålesund");