const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const container = document.querySelector(".displayContainer");
const apiKey = "dcd2ea46ebda8bf782d22565b5004e8d";

weatherForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const city = cityInput.value;
  if (city) {
    try {
      const weatherData = await getWeatherData(city);
      console.log(JSON.stringify(weatherData, null, 2));

      displayWeather(weatherData);
    } catch (error) {
      console.error(error);
      displayError(error);
    }
  } else {
    displayError("Please Enter a City");
  }
});

async function getWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error("could not fetch weather data");
  }
  return await response.json();
}

function displayWeather(data) {
  const {
    name: city,
    main: { temp, humidity },
    weather: [{ description, id }],
  } = data;
  container.textContent = "";
  const cityDisplay = document.createElement("h1");
  const tempDisplay = document.createElement("p");
  const humDisplay = document.createElement("p");
  const info = document.createElement("p");
  const emoji = document.createElement("p");

  cityDisplay.textContent = city;
  tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
  humDisplay.textContent = `Humidity: ${humidity}%`;
  info.textContent = description;
  emoji.textContent = getWeatherEmoji(id);

  cityDisplay.classList.add("cityDisplay");
  tempDisplay.classList.add("tempDisplay");
  humDisplay.classList.add("humDisplay");
  info.classList.add("info");
  emoji.classList.add("emoji");

  container.appendChild(cityDisplay);
  container.appendChild(tempDisplay);
  container.appendChild(humDisplay);
  container.appendChild(info);
  container.appendChild(emoji);
}
function getWeatherEmoji(weatherId) {
  switch (true) {
    case weatherId >= 200 && weatherId < 300:
      return "⛈️";
    case weatherId >= 300 && weatherId < 400:
      return "🌧️";
    case weatherId >= 500 && weatherId < 600:
      return "🌧️";
    case weatherId >= 600 && weatherId < 700:
      return "❄️";
    case weatherId >= 700 && weatherId < 800:
      return "☁️";
    case weatherId === 800:
      return "☀️";
    case weatherId >= 801 && weatherId < 810:
      return "☁️";
    default:
      return "❓";
  }
}
function displayError(message) {
  const errors = document.createElement("p");
  errors.textContent = message;
  errors.classList.add("errorDisplay");
  container.textContent = "";
  container.appendChild(errors);
}
