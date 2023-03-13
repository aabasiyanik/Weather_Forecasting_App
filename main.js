let loc = document.getElementById("location")
let tempicon = document.getElementById("temp-icon");
let tempvalue = document.getElementById("temp-value")
let climate = document.getElementById("climate");

const searchInput = document.getElementById("search-input");

searchInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        const userInput = e.target.value;
        getWeather(userInput);
        userInput.value = '';
    }
});

const getWeather = async (city) => {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=[You can put your own API here]`,
            { mode: "cors" }
        );


        const weatherData = await response.json();
        const { name } = weatherData;
        const { feels_like } = weatherData.main;
        const { id, main } = weatherData.weather[0];
        loc.textContent = name;
        climate.textContent = main;
        tempvalue.textContent = Math.round(((feels_like - 273) * (1.8)) + 32)
        console.log(id);
        if (id >= 200 && id < 300) {
            tempicon.src = "./weather_icons/thunderstorm.svg"
        } else if (id >= 300 && id < 500) {
            tempicon.src = "./weather_icons/rain.svg"
        } else if (id >= 500 && id < 600) {
            tempicon.src = "./weather_icons/sun_rain.svg"
        } else if (id >= 600 && id < 700) {
            tempicon.src = "./weather_icons/snow.svg"
        } else if (id > 700 && id < 800) {
            tempicon.src = "./weather_icons/wind.svg"
        } else if (id == 800) {
            tempicon.src = "./weather_icons/sun.svg"
        } else if (id == 801) {
            tempicon.src = "./weather_icons/cloudy.svg"
        } else if (id > 801 && id < 805) {
            tempicon.src = "./weather_icons/full_cloudy.svg"
        }
    } catch (error) {
        alert('city not found')
    }
};

window.addEventListener("load", () => {
    let lon;
    let lat;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            lon = position.coords.longitude;
            lat = position.coords.latitude;

            const api_key = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=[You can put your own API here]`

            fetch(api_key).then((response) => {
                return response.json();
            })

                .then(data => {
                    const { name } = data;
                    const { feels_like } = data.main;
                    const { id, main } = data.weather[0];

                    loc.textContent = name;
                    climate.textContent = main;
                    tempvalue.textContent = Math.round(((feels_like - 273) * (1.8)) + 32);
                    console.log(id);
                    if (id >= 200 && id < 300) {
                        tempicon.src = "./weather_icons/thunderstorm.svg"
                    } else if (id >= 300 && id < 500) {
                        tempicon.src = "./weather_icons/rain.svg"
                    } else if (id >= 500 && id < 600) {
                        tempicon.src = "./weather_icons/sun_rain.svg"
                    } else if (id >= 600 && id < 700) {
                        tempicon.src = "./weather_icons/snow.svg"
                    } else if (id > 700 && id < 800) {
                        tempicon.src = "./weather_icons/wind.svg"
                    } else if (id == 800) {
                        tempicon.src = "./weather_icons/sun.svg"
                    } else if (id == 801) {
                        tempicon.src = "./weather_icons/cloudy.svg"
                    } else if (id > 801 && id < 805) {
                        tempicon.src = "./weather_icons/full_cloudy.svg"
                    }



                })
        }
        )
    }
})
