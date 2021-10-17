//Add Current Date & Time to p class=refreshTimestamp
function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  return `${day} ${hours}:${minutes}`;
}

function displayWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#current-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;
}

function searchCity(city) {
  let apiKey = "1a6432c5ca7b6f9b0bee45c98d54ea71";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
  debugger;
  event.preventDefault();
  let city = document.querySelector("#search-query").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "1a6432c5ca7b6f9b0bee45c98d54ea71";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function getCurrentLocationWeather(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function convertFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp");
  let temperature = temperatureElement.innerHTML;
  temperatureElement.innerHTML = 73;
}

function convertCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = 27;
}

function showTemperature(response) {
  let unix = response.data.sys.sunrise;
  let date = new Date(unix * 1000);
  let sunrise = document.querySelector("#sunrise-time");
  sunrise.innerHTML = date;
}

//Part 1
let timestamp = document.querySelector("#current-timestamp");
let currentTime = new Date();
timestamp.innerHTML = formatDate(currentTime);

//Part 2
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

//Part 3
let fahrenheitlink = document.querySelector("#fahrenheit-link");
fahrenheitlink.addEventListener("click", convertFahrenheit);

let celsiuslink = document.querySelector("#celsius-link");
celsiuslink.addEventListener("click", convertCelsius);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocationWeather);

searchCity("Toronto");
