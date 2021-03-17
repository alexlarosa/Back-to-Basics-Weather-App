function formatDate(timestamp) {

    let date  = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${hours}`
    }; 
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`
    };
    let daysOfTheWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Friday", "Saturday"];
    let day = daysOfTheWeek[date.getDay()];

    return `${day} ${hours}:${minutes}`;
}


function displayTemperature(response){

let dateElement = document.querySelector("#date");
let cityElement = document.querySelector("#city");
let tempElement = document.querySelector("#temperature");
let descriptionElement = document.querySelector("#weather-description");
let windElement = document.querySelector("#windSpeed");
let iconElement = document.querySelector("#weatherIcon");

celciusTemperature = response.data.main.temp;
kmh = response.data.wind.speed

dateElement.innerHTML = formatDate(response.data.dt* 1000);
cityElement.innerHTML = response.data.name;
tempElement.innerHTML = Math.round(celciusTemperature);
descriptionElement.innerHTML =response.data.weather[0].description;
windElement.innerHTML = `${Math.round(kmh)} km/h`;
iconElement.setAttribute(
    "src", 
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    )
    iconElement.setAttribute("alt", response.data.weather[0].description);
}


function search(city) {
let apiKey = "aea833a90485bad517aeb7963cee7156";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#search-input");
    console.log(cityInputElement.value);
search(cityInputElement.value);
}

function displayImperialData(event) {
    event.preventDefault();
    let fahrenheitTemperature = (celciusTemperature * 9) / 5 + 32;
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
    metricsLink.classList.remove("active");
    imperialLink.classList.add("active");

    let mph = kmh / 1.609;
    let windSpeedElement = document.querySelector("#windSpeed");
    windSpeedElement.innerHTML = `${Math.round(mph)} mph`;
}

function displayMetricsData(event) {
    event.preventDefault();
    metricsLink.classList.add("active");
    imperialLink.classList.remove("active");
    document.querySelector("#temperature").innerHTML = Math.round(celciusTemperature);
    document.querySelector("#windSpeed").innerHTML = `${Math.round(kmh)} km/h`;
}

search("Madrid");

let celciusTemperature = null;
let kmh = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let imperialLink = document.querySelector("#imperial-link");
imperialLink.addEventListener("click", displayImperialData)

let metricsLink = document.querySelector("#metrics-link");
metricsLink.addEventListener("click", displayMetricsData);
