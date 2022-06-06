// Javascript behind the application

let weather = {
  apikey: "c7dd1f48d200b1c6bc7c0594a4501c5e",
  fetchWeather: function (city) {
    fetch(
        // Template link to fetch data from specified city using API
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apikey}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    // Constants made from JSON
    const { name } = data,
    { description, icon } = data.weather[0],
    { temp, humidity } = data.main,
    { speed } = data.wind;
    // console.log(name, icon, description, temp, humidity, speed);

    // Show searched location
    document.querySelector(".location-city").innerHTML = "Weather in " + name;
    // Show icon relevant to weather
    document.querySelector(".icon").src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    // Show temperature
    document.querySelector(".temperature-degree").innerHTML = temp + "°C";
    // Show humidity
    document.querySelector(".humidity").innerHTML = "Humidity: " + humidity + "%";
    // Show wind
    document.querySelector(".wind").innerHTML = "Wind: " + speed + "Km/hr";
    // Remove "loading"
    document.querySelector(".weather ").classList.remove("loading");

    // Find size of screen to get accurate sized background
    const win = window,
        doc = document,
        docElem = doc.documentElement,
        body = doc.getElementsByTagName('body')[0],
        x = win.innerWidth || docElem.clientWidth || body.clientWidth,
        y = win.innerHeight || docElem.clientHeight || body.clientHeight;
    //alert(x + ' × ' + y);

    // Set the background to image of the city entered
    document.body.style.backgroundImage = `url('https://source.unsplash.com/${x}x${y}/?${description}')`;
    // Reset search bar value to empty
    document.querySelector(".search-bar").value = "";
  },
  search: function () {
    // Pointer to value entered
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

// On click of button, search
document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

// On key presses Enter. search
document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      weather.search();
    }
  });

// Default town, Maynooth, my universities town
weather.fetchWeather("Maynooth");
