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
  let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

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
  let apiKey = `b9b01b314c8b7bd51fdfba206fbf2d6a`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  
  axios.get(apiUrl).then(displayForecast);
}

function displayImage(icon) {
  let iconPath = "";
  if (icon === "01d" || icon === "01n") {
    iconPath = "media/sunny.svg";
  } else if (icon === "02d" ||icon === "02n") {
    iconPath = "media/partly-cloudy.svg";
  } else if (icon === "03d" || icon === "03n" || icon === "04d" || icon === "04n") {
    iconPath = "media/partly-cloudy.svg";
  } else if ( icon === "09d" || icon === "09d") {
    iconPath = "media/shower-rain.svg";
  } else if ( icon === "10d" || icon === "10n") {
    iconPath = "media/rainy.svg";
  } else if (icon === "11d" || icon === "11n") {
    iconPath = "media/lightning.svg";
  } else if (icon === "13d" || icon === "13n") {
    iconPath = "media/snow.svg";
  } else if (icon == "50d" || icon === "50n") {
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
    console.log(forecastDay.weather[0]);
    if (index < 5) {
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
              src= "${displayImage(forecastDay.weather[0].icon)}"
              alt= "${forecastDay.weather[0].description}"
              width = "30px"
              />
            </div>
          </div>
        `;
    }
  })
  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
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

function goToSydney(event) {
  event.preventDefault;
  searchCity("Sydney");
}

function goToNewYork(event) {
  event.preventDefault;
  searchCity("New York");
}

function goToCannes(event) {
  event.preventDefault;
  searchCity("Cannes");
}

function goToSingapore(event) {
  event.preventDefault;
  searchCity("Singapore");
}

let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", handleSubmit);



let sydneyBtn = document.querySelector("#Sydney");
sydneyBtn.addEventListener("click", goToSydney);

let newYorkBtn = document.querySelector("#New-York");
newYorkBtn.addEventListener("click", goToNewYork);

let cannesBtn = document.querySelector("#Cannes");
cannesBtn.addEventListener("click", goToCannes);

let singaporeBtn = document.querySelector("#Singapore");
singaporeBtn.addEventListener("click", goToSingapore);

searchCity("Ålesund");