const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const city = document.getElementById("city");
const temperature = document.getElementById("temperature");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");

const errorDiv = document.getElementById("error");

async function getWeather() {

    const cityName = cityInput.value.trim();

    if(cityName === ""){
        errorDiv.textContent = "Please enter a city.";
        return;
    }

    try{

        errorDiv.textContent = "";

        const geoResponse =
        await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1`
        );

        const geoData =
        await geoResponse.json();

        if(!geoData.results){

            throw new Error("City not found");

        }

        const latitude =
        geoData.results[0].latitude;

        const longitude =
        geoData.results[0].longitude;

        const weatherResponse =
        await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m`
        );

        const weatherData =
        await weatherResponse.json();

        city.textContent =
        geoData.results[0].name;

        temperature.textContent =
        `Temperature: ${weatherData.current.temperature_2m} °C`;

        humidity.textContent =
        `Humidity: ${weatherData.current.relative_humidity_2m}%`;

        wind.textContent =
        `Wind Speed: ${weatherData.current.wind_speed_10m} km/h`;

    }

    catch(error){

        errorDiv.textContent =
        error.message;

    }

}

searchBtn.addEventListener(
    "click",
    getWeather
);