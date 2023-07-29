const API_key = "3291577ecd5cadc11840fdaa4e30e0f8";
const weather = document.querySelector(".icon");
const countrycode = document.querySelector(".icon1");
const weatherCardsDiv = document.querySelector(".weather-cards-1");

/*Theme switcher*/
const body = document.querySelector("body"),
    nav = document.querySelector("nav"),
    modeToggle = document.querySelector(".dark-light"),
    sidebarOpen = document.querySelector(".sidebarOpen"),
    siderbarClose = document.querySelector(".siderbarClose");

let getMode = localStorage.getItem("mode");
if (getMode && getMode === "dark-mode") {
    body.classList.add("dark"); /*add class dark of css to the body of HTML document*/
}
// js code to toggle dark and light mode
modeToggle.addEventListener("click", () => {
    modeToggle.classList.toggle("active");
    body.classList.toggle("dark");
    // js code to keep user selected mode even page refresh or file reopen
    if (!body.classList.contains("dark")) {
        localStorage.setItem("mode", "light-mode");
    } else {
        localStorage.setItem("mode", "dark-mode");
    }
});
//   js code to toggle sidebar
sidebarOpen.addEventListener("click", () => {
    nav.classList.add("active");
});
body.addEventListener("click", e => {
    let clickedElm = e.target;
    if (!clickedElm.classList.contains("sidebarOpen") && !clickedElm.classList.contains("menu")) {
        nav.classList.remove("active");
    }
});

const createWeatherCard = (data) => {
    const date1 = data.dt_txt.split(" ")[0];
    const DateFormat = date1.split("-");
    const date = DateFormat[2] + "-" + DateFormat[1] + "-" + DateFormat[0];
    return `<li class="card">
                    <h3>${date}</h3>
                    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png" alt="weather-icon">
                    <h4>${data.weather[0].description}</h4><br>
                    <p>Temperature: ${(data.main.temp - 273.15).toFixed(2)} °C</p>
                    <p>Wind Speed: ${(data.wind.speed * 3.6).toFixed(2)} km/hr</p>
                    <p>Humidity: ${data.main.humidity} %</p>
                    <p>Pressure: ${data.main.pressure} hPa</p>
                </li>`;
}

const createWeather = (data) => {
    return `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png" alt="weather-icon">
            <h4>${data.weather[0].description}</h4>`
}

const createCountry = (data) => {
    let regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
    const name = regionNames.of(data.sys.country);
    const name1 = (data.sys.country).toLowerCase();
    return `<br><p>${name}</p>
            <img src="https://flagcdn.com/w80/${name1}.jpg">`
}

const createTemp = (data) => {
    temp1 = (data.main.temp - 273.15).toFixed(2) + " °C";
    return `<img src="images/temperature.png" style="padding:20px 20px" height="105px" width="105px">
            <p>${temp1}</p>`
}

const createHumidity = (data) => {
    humidity1 = data.main.humidity + " %"
    return `<img src="images/humidity (2).png" style="padding:20px 20px" height="105px" width="105px">
            <p>${humidity1}</p>`
}

const createPressure = (data) => {
    pressure1 = data.main.pressure + " hPa"
    return `<img src="images/barometer.png" style="padding:20px 20px" height="105px" width="105px">
            <p>${pressure1}</p>`
}

const createVisibility = (data) => {
    visibility1 = (data.visibility / 1000).toFixed(2) + " km"
    return `<img src="images/visibility.png" style="padding:20px 20px" height="105px" width="105px">
            <p>${visibility1}</p>`
}

const createWind = (data) => {
    wind1 = (data.wind.speed * 3.6).toFixed(2) + " km/hr"
    wind2 = data.wind.deg + " degrees"
    return `<img src="images/wind.png" style="padding:20px 20px" height="105px" width="105px">
            <p>Wind Speed -> ${wind1}</p>
            <p>Wind Direction -> ${wind2}</p>`
}

function getWeather(cityname, latitude, longitude) {
    const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_key}`;
    fetch(WEATHER_API_URL).then(res => res.json()).then(data => {
        name1.innerHTML = cityname;

        countrycode.innerHTML = "";
        const html1 = createCountry(data);
        countrycode.insertAdjacentHTML("beforeend", html1);

        weather.innerHTML = "";
        const html = createWeather(data);
        weather.insertAdjacentHTML("beforeend", html); /*insert the html code from createWeather function*/
        /*beforeend is used to indicate the position which is before the end of the element (here the div with class 'icon')*/

        temp.innerHTML = "";
        const html2 = createTemp(data);
        temp.insertAdjacentHTML("beforeend", html2);

        humidity.innerHTML = "";
        const html3 = createHumidity(data);
        humidity.insertAdjacentHTML("beforeend", html3);

        pressure.innerHTML = "";
        const html4 = createPressure(data);
        pressure.insertAdjacentHTML("beforeend", html4);

        visibility.innerHTML = "";
        const html5 = createVisibility(data);
        visibility.insertAdjacentHTML("beforeend", html5);

        wind.innerHTML = "";
        const html6 = createWind(data);
        wind.insertAdjacentHTML("beforeend", html6);

    }).catch(() => {
        console.log();
        alert("An error occurred while fetching the weather");
    });

    const AIR_POLLUTION_URL = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${API_key}`;
    fetch(AIR_POLLUTION_URL).then(res => res.json()).then(data => {
        const OAQ1 = data.list[0].main.aqi;
        const table = { 1: 'Good', 2: 'Fair', 3: 'Moderate', 4: 'Poor', 5: 'Very Poor' };
        for (const key in table) {
            if (key == OAQ1) {
                OAQ.innerHTML = OAQ1 + "<br>" + table[key];
            }
        }
        CO.innerHTML = data.list[0].components.co.toFixed(2) + " μg/m<sup>3</sup>"
        NO.innerHTML = data.list[0].components.no.toFixed(2) + " μg/m<sup>3</sup>"
        NH3.innerHTML = data.list[0].components.nh3.toFixed(2) + " μg/m<sup>3</sup>"
        NO2.innerHTML = data.list[0].components.no2.toFixed(2) + " μg/m<sup>3</sup>"
        O3.innerHTML = data.list[0].components.o3.toFixed(2) + " μg/m<sup>3</sup>"
        PM25.innerHTML = data.list[0].components.pm2_5.toFixed(2) + " μg/m<sup>3</sup>"
        PM10.innerHTML = data.list[0].components.pm10.toFixed(2) + " μg/m<sup>3</sup>"
        SO2.innerHTML = data.list[0].components.so2.toFixed(2) + " μg/m<sup>3</sup>"
    }).catch(() => {
        alert("An error occurred while fetching the air quality statistics");
    });

    const FORECAST_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_key}`;
    fetch(FORECAST_URL).then(res => res.json()).then(data => {
        const uniqueForecastDays = [];
        const fiveDaysForecast = data.list.filter(forecast => {
            const forecastDate = new Date(forecast.dt_txt).getDate();
            if (!uniqueForecastDays.includes(forecastDate)) {
                return uniqueForecastDays.push(forecastDate);
            }
        });

        weatherCardsDiv.innerHTML = "";

        fiveDaysForecast.forEach((data, index) => {
            if (index === 0) return;
            else {
                const html7 = createWeatherCard(data);
                weatherCardsDiv.insertAdjacentHTML("beforeend", html7);
            }
        });
    }).catch(() => {
        alert("An error occurred while fetching the 5 day forecast");
    });
}

const getCityCoordinates = () => {
    const cityname = city.value.trim();
    if (!cityname) return;
    const GEOCODING_API_URL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityname}&limit=1&appid=${API_key}`

    // Get entered city coordinates from API response
    fetch(GEOCODING_API_URL).then(res => res.json()).then(data => {
        if (!data.length) return alert(`No coordinates found for ${cityname}`);
        const { name, lat, lon } = data[0];
        getWeather(name, lat, lon);
    }).catch(() => {
        alert("An error occurred while fetching the coordinates");
    })
}

submit.addEventListener("click", (e) => {
    e.preventDefault(); //for the page to not reload
    getCityCoordinates();
});

/*Function to get weather via user's current location*/
const loc = document.querySelector(".location-btn");
const getUserCoordinates = () =>
{
    if(navigator && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords; // Get coordinates of user location
                // Get city name from coordinates using reverse geocoding API
                const API_URL = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_key}`;
                fetch(API_URL).then(response => response.json()).then(data => {
                    const { name } = data[0];
                    getWeather(name, latitude, longitude);
                }).catch(() => {
                    alert("An error occurred while fetching the city name!");
                });
            },// Show alert if user denied the location permission
            error => {
                if (error.code === error.POSITION_UNAVAILABLE) {
                    alert("Please enable location services");
                }
                else if (error.code === error.PERMISSION_DENIED) {
                    alert("Geolocation request denied. Please enable/reset location permission to grant access again.");
                } 
                else {
                    alert(`ERROR - (${error.code} : ${error.message})`);
                }
            }),
            {enableHighAccuracy: true};/* if the device is able to provide a more accurate position, it will do so*/
    }
}

loc.addEventListener("click", getUserCoordinates);

/*Function to load info when enter key is pressed*/
city.addEventListener("keypress", (e1) => {
    if (e1.key == "Enter") {
        e1.preventDefault();
        document.getElementById("submit").click();
    }
});
