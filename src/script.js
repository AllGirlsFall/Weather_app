let now = new Date();
let date = now.getDate();
let hour = now.getHours();
let minutes = now.getMinutes();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let currentTime = document.querySelector("#time");
currentTime.innerHTML = `${day}, ${hour}:${minutes}`;

function searchLocation(event) {
  event.preventDefault();
  let searchUserInput = document.querySelector("#search-input");
  let apiKey = "1da4edc0c8b119bb4b7b8bee71a5ad31";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchUserInput.value}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemp);
}

let form = document.querySelector("#city-search");
form.addEventListener("submit", searchLocation);

function showTemp(response) {
  console.log(response.data);
  let cityName = response.data.name;
  let currentTemp = Math.round(response.data.main.temp);
  let cityElement = document.querySelector("#display");
  cityElement.innerHTML = cityName;
  let tempElement = document.querySelector("#temperature");
  tempElement.innerHTML = `${currentTemp}°C`;
}

function showLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "1da4edc0c8b119bb4b7b8bee71a5ad31";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemp);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}

let btn = document.querySelector("#current-btn");
btn.addEventListener("click", getCurrentPosition);

let userSearch = document.querySelector("#search-input");
userSearch.addEventListener("submit", showLocation);
