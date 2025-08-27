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
      displayWeather(weatherData);
    } catch (error) {
      console.error(error);
      displayError(error);
    }
  } else {
    displayError("Please Enter a City Name!");
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
    wind: { speed },
    sys: { sunrise, sunset },
  } = data;
  container.textContent = "";
  const cityDisplay = document.createElement("h1");
  const tempDisplay = document.createElement("p");
  const humDisplay = document.createElement("p");
  const info = document.createElement("p");
  const emoji = document.createElement("p");
  const windDisplay = document.createElement("p");
  const sunriseDisplay = document.createElement("p");
  const sunsetDisplay = document.createElement("p");
  const sec1 = document.createElement("div");
  const sec2 = document.createElement("div");
  const sec2a = document.createElement("div");
  const sec2b = document.createElement("div");
  const sec3 = document.createElement("div");

  cityDisplay.textContent = city;
  tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
  humDisplay.textContent = `Humidity: ${humidity}%`;
  info.textContent = description;
  emoji.textContent = getWeatherEmoji(id);
  windDisplay.textContent = `Wind: ${speed} m/s`;
  sunriseDisplay.textContent = `Sunrise: ${formatTime(sunrise)}`;
  sunsetDisplay.textContent = `Sunset: ${formatTime(sunset)}`;

  cityDisplay.classList.add("cityDisplay");
  tempDisplay.classList.add("tempDisplay");
  humDisplay.classList.add("humDisplay");
  info.classList.add("info");
  emoji.classList.add("emoji");
  windDisplay.classList.add("windDisplay");
  sunriseDisplay.classList.add("sunriseDisplay");
  sunsetDisplay.classList.add("sunsetDisplay");
  sec1.classList.add("section1");
  sec2.classList.add("section2");
  sec2a.classList.add("section2a");
  sec2b.classList.add("section2b");
  sec3.classList.add("section3");

  container.appendChild(sec1);
  container.appendChild(sec2);
  sec2.appendChild(sec2a);
  sec2.appendChild(sec2b);
  container.appendChild(sec3);
  sec1.appendChild(cityDisplay);
  sec2a.appendChild(tempDisplay);
  sec2a.appendChild(humDisplay);
  sec2b.appendChild(info);
  sec2b.appendChild(emoji);
  sec3.appendChild(windDisplay);
  sec3.appendChild(sunriseDisplay);
  sec3.appendChild(sunsetDisplay);
  console.log(container);
}
function getWeatherEmoji(weatherId) {
  switch (true) {
    case weatherId >= 200 && weatherId < 300:
      return "⛈️"; // Thunderstorm
    case weatherId >= 300 && weatherId < 400:
      return "🌦️"; // Drizzle
    case weatherId >= 500 && weatherId < 600:
      return "🌧️"; // Rain
    case weatherId >= 600 && weatherId < 700:
      return "❄️"; // Snow
    case weatherId === 701 || weatherId === 741:
      return "🌫️"; // Mist / Fog
    case weatherId === 781:
      return "🌪️"; // Tornado
    case weatherId === 800:
      return "☀️"; // Clear
    case weatherId === 801:
      return "🌤️"; // Few clouds
    case weatherId === 802:
      return "⛅"; // Scattered clouds
    case weatherId === 803 || weatherId === 804:
      return "☁️"; // Broken/overcast clouds
    default:
      return "❓"; // Unknown
  }
}
function displayError(message) {
  const errors = document.createElement("p");
  errors.textContent = message;
  errors.classList.add("errorDisplay");
  container.textContent = "";
  container.appendChild(errors);
}
function formatTime(unix) {
  const date = new Date(unix * 1000);
  return date.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });
}
