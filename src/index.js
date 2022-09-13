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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Monday", "Tuesday", "Wednesday", "Friday", "Saturday", "Sunday"];

  return days[day];
}

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
    `${displayImage(response.data.weather[0].icon)}`
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

function displayImage(icon) {
  let iconPath = "";
  if (icon === "01d.png" || icon === "01n.png") {
    iconPath = "media/sunny.svg";
  } else if (icon === "02d.png" ||icon === "02n.png") {
    iconPath = "media/partly-cloudy.svg";
  } else if (
    icon === "03d.png" || icon === "03n.png" || icon === "04d.png" || icon === "04n.png") {
      iconPath = "media/partly-cloudy.svg";
    } else if ( icon === "09d.png" || icon === "09d.png") {
      iconPath = "media/shower-rain.svg";
    } else if ( icon === "10d.png" || icon === "10n.png") {
      iconPath = "media/rainy.svg";
    } else if (icon === "11d.png" || icon === "11n.png") {
      iconPath = "media/lightning.svg";
    } else if (icon === "13d.png" || icon === "13n.png") {
      iconPath = "media/snow.svg";
    } else if (icon == "50d.png" || icon === "50n.png") {
      iconPath = "media/foggy.svg";
    } else {
      iconPath = "media/sunny.svg";
    }

    return iconPath;
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  
  let forecastHTML = `<div class="row ">`;
  forecast.forEach(function(forecastDay, index) {
    if (index < 6) {
        forecastHTML =
          forecastHTML +
          `    
          <div class="row forecast-next-day">
            <div class="col-6">
                ${formatDay(forecastDay.dt)}
            </div>
            <div class="col-4 forecast-temperature">
              ${Math.round(forecastDay.temp.day)}°C
            </div>
            <div class="col-2">
              <img 
              class="forecast-weather"
              src= ${displayImage(forecastDay.weather[0].icon)}
              alt= ${forecastDay.weather[0].description}
              width = "50px"
              />
            </div>
          </div>
        `;
    }
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


searchCity("Ålesund");