// Add current time
function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

let dateElement = document.querySelector("#current-time");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

// add search engine
function getForecast(coordinates) {
  let apiKey = "8dda5f6d0a65b312a53b284a407d1e35";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}


function displayWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
    
    let iconElement = document.querySelector("#icon");
iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
iconElement.setAttribute("alt",  response.data.main.temp);

document.querySelector("#humidity").innerHTML = response.data.main.humidity;
document.querySelector("#wind-speed").innerHTML = Math.round(response.data.wind.speed);

celsiusTemperature = response.data.main.temp;

getForecast(response.data.coord);

}

function searchCity(city) {
  let apiKey = "8dda5f6d0a65b312a53b284a407d1e35";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function handleSearch(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSearch);

// change between °C and °F
function convertToFahrenheit(event) {
  event.preventDefault();
  // remove the active class from celsius link
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemp = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}

function convertToCelsius(event) {
 event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

function currentLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "8dda5f6d0a65b312a53b284a407d1e35";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function GetcurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentLocation);
}

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", GetcurrentLocation);

function displayForecast(response) {
  console.log(response.data.daily)
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = ` <div class="row row-cols-1 row-cols-md-3 g-6"> `;
  let days = ["Thursday", "Friday", "Saturday", "Sunday"]
  days.forEach(function (day) {
  forecastHTML = forecastHTML +
   `    <div class="weather-forecast" id="forecast">
          <div class="col">
            <div class="card">
              <div class="card-body">
                <h5 class="weather-forecast-date">${day}</h5>
                <p class="card-text">
                  🌧 <br />
                  14 | 7
                </p>
              </div>
            </div>
        </div>
      </div>`
            });

  forecastHTML = forecastHTML + `</div>`
  forecastElement.innerHTML = forecastHTML;

}

searchCity("london");
