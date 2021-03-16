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

document.querySelector("#city").innerHTML = response.data.name;

let tempElement = document.querySelector("#temperature");
tempElement.innerHTML = Math.round(response.data.main.temp);

document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;

document.querySelector("#windSpeed").innerHTML = Math.round(response.data.wind.speed);

let dateElement = document.querySelector("#date");
dateElement.innerHTML = formatDate(response.data.dt* 1000);
}

let apiKey = "aea833a90485bad517aeb7963cee7156";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Madrid&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);