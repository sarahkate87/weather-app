let currentDateTime = new Date();
// Date
function showDate(date) {
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

  let monthIndex = date.getMonth();
  let months = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec"
  ];

  let month = months[monthIndex];

  let dayNum = date.getDate();

  return `${day} ${dayNum} ${month}`;
}

let todaysDate = document.querySelector("#todays-date");
todaysDate.innerHTML = showDate(currentDateTime);

// Time
function showTime(time) {
  let hours = time.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = time.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

let currentTime = document.querySelector("#current-time");
currentTime.innerHTML = showTime(currentDateTime);

// Weather Conditions
function displayWeather(response) {
  document.querySelector("#current-city").innerHTML=response.data.name;
  document.querySelector("#country-code").innerHTML=response.data.sys.country;
  document.querySelector("#current-temp").innerHTML=Math.round(response.data.main.temp);
  document.querySelector("#description").innerHTML = response.data.weather[0].main;
  document.querySelector("#wind-speed").innerHTML=Math.round(response.data.wind.speed);
  document.querySelector("#high-temp").innerHTML=Math.round(response.data.main.temp_max);
  document.querySelector("#low-temp").innerHTML=Math.round(response.data.main.temp_min);
  
}

// Search City
function searchCity(city) {
  let apiKey="9e5720bf1c8d5cf0a9989c3fb45bc7a2";
  let units = "metric";
  let url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(url).then(displayWeather);
}

function handleSearch(event){
  event.preventDefault();
  let city = document.querySelector("#inputted-city").value;
  searchCity(city);
}

let searchForm = document.querySelector("#update-search");
searchForm.addEventListener("submit", handleSearch);

//Geolocation
function searchLocation(position) {
let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = "9e5720bf1c8d5cf0a9989c3fb45bc7a2";
  let units = "metric";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=${units}`;
  
  axios.get(url).then(displayWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#geolocation");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("London");
