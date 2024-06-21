const cities = [
    { name: "Karachi", lat: 24.8607, lon: 67.0011 },
    { name: "Lahore", lat: 31.5497, lon: 74.3436 },
    { name: "Islamabad", lat: 33.6844, lon: 73.0479 },
    { name: "Quetta", lat: 30.1798, lon: 66.9750 },
    { name: "Peshawar", lat: 34.0151, lon: 71.5249 },
    { name: "Faisalabad", lat: 31.4180, lon: 73.0790 },
    { name: "Rawalpindi", lat: 33.5651, lon: 73.0169 },
    { name: "Multan", lat: 30.1575, lon: 71.5249 },
    { name: "Gujranwala", lat: 32.1877, lon: 74.1945 },
    { name: "Sialkot", lat: 32.4927, lon: 74.5319 },
    { name: "Sukkur", lat: 27.7139, lon: 68.8574 },
    { name: "Larkana", lat: 27.5580, lon: 68.2120 },
    { name: "Sheikhupura", lat: 31.7131, lon: 73.9783 },
    { name: "Sargodha", lat: 32.0836, lon: 72.6711 },
    { name: "Bahawalpur", lat: 29.3956, lon: 71.6836 },
    { name: "Jhang", lat: 31.2690, lon: 72.3175 },
    { name: "Dera Ghazi Khan", lat: 30.0561, lon: 70.6348 },
    { name: "Sahiwal", lat: 30.6667, lon: 73.1019 },
    { name: "Nawabshah", lat: 26.2483, lon: 68.4096 },
    { name: "Mardan", lat: 34.1985, lon: 72.0408 },
    { name: "Mingora", lat: 34.7755, lon: 72.3620 },
    { name: "Mirpur Khas", lat: 25.5276, lon: 69.0111 },
    { name: "Okara", lat: 30.8081, lon: 73.4458 },
    { name: "Chiniot", lat: 31.7206, lon: 72.9784 },
    { name: "Lodhran", lat: 29.5403, lon: 71.6333 }
];

const apiKey = "c153479685c47f1b34a83591f3b1acbe";

async function getWeather(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${apiKey}&units=metric`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error: ', error);
        return null;
    }
}

function populateCitySelect() {
    const citySelect = document.getElementById('city-select');
    cities.forEach(city => {
        const option = document.createElement('option');
        option.value = JSON.stringify(city);
        option.textContent = city.name;
        citySelect.appendChild(option);
    });
}

async function displayWeather() {
    const citySelect = document.getElementById('city-select');
    const selectedCity = JSON.parse(citySelect.value);
    const weatherDetails = document.getElementById('weather-details');

    weatherDetails.innerHTML = '<p>Loading...</p>';
    weatherDetails.style.display = 'block';

    const weatherData = await getWeather(selectedCity);

    if (weatherData) {
        weatherDetails.innerHTML = `
            <h2 id="city-name">${selectedCity.name}</h2>
            <p id="weather-description">Weather: ${weatherData.weather[0].description}</p>
            <p id="temperature">Temperature: ${weatherData.main.temp}°C</p>
            <p id="humidity">Humidity: ${weatherData.main.humidity}%</p>
            <p id="wind">Wind: ${weatherData.wind.speed} m/s</p>
        `;
    } else {
        weatherDetails.innerHTML = '<p>Error fetching data</p>';
    }
}

document.getElementById('city-select').addEventListener('change', displayWeather);

populateCitySelect();
