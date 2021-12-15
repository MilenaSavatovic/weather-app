let currentTime = new Date()

function formatDay(currentTime) {
  let currentDay = document.querySelector('#current-day')

  let days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ]

  currentDay.innerHTML = days[currentTime.getDay()]
}

formatDay(currentTime)

function formatDate(currentTime) {
  let currentDate = document.querySelector('#current-date-month')

  let months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  currentDate.innerHTML =
    currentTime.getDate() + '. ' + months[currentTime.getMonth()]
}

formatDate(currentTime)

function formatTime(event) {
  let time = document.querySelector('h3')
  time.innerHTML = currentTime.getHours() + ':' + currentTime.getMinutes()
}

formatTime(currentTime)

function showWeather(response) {
  let tempMin = Math.round(response.data.main.temp_min)
  let tempMax = Math.round(response.data.main.temp_max)
  let description = response.data.weather[0].description
  // let icon = response.data.weather[0].icon;
  // var iconUrl = "http://openweathermap.org/img/w/" + icon + ".png";

  let currentMin = document.querySelector('#temperature-low-first')
  let currentMax = document.querySelector('#temperature-high-first')
  let weatherDescription = document.querySelector('.weather')
  // let weatherIcon = document.querySelector("#weather-icon");

  currentMin.innerHTML = tempMin
  currentMax.innerHTML = tempMax
  weatherDescription.innerHTML = description
  // weatherIcon.innerHTML =
  // "<img src=" + iconUrl + "alt='Icon depicting current weather.'/>";
}

function searchForCity(event) {
  event.preventDefault()
  let city = document.querySelector('#input')
  let country = document.querySelector('h2')

  let apiKey = '9402fdeb43e1bddf29be4a16f4625ef0'
  let url =
    'https://api.openweathermap.org/data/2.5/weather?q=' +
    city.value +
    '&appid=' +
    apiKey +
    '&units=metric'

  if (city !== undefined) {
    let h1 = document.querySelector('h1')
    h1.innerHTML = city.value
    country.innerHTML = ' '
    axios.get(url).then(showWeather)
  } else {
    city = null
    alert('Please enter a city name.')
  }
}

let submitButton = document.querySelector('#input-form')
submitButton.addEventListener('submit', searchForCity)

function showCurrentWeather(response) {
  let h1 = document.querySelector('h1')
  let h2 = document.querySelector('h2')
  let city = response.data.name
  let country = response.data.sys.country

  h1.innerHTML = city
  h2.innerHTML = country

  showWeather(response)
}

function retrievePosition(position) {
  let apiKey = '3cc4089a402da308c73b760596562e2f'
  let lat = position.coords.latitude
  let lon = position.coords.longitude
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
  axios.get(url).then(showCurrentWeather)
}

function getCurrentPosition(event) {
  event.preventDefault()
  navigator.geolocation.getCurrentPosition(retrievePosition)
}

let locationButton = document.querySelector('#location-button')
locationButton.addEventListener('click', getCurrentPosition)

function calculateToCelsius(temp) {
  let celsiusTemp = Math.round(((temp - 32) * 5) / 9)
  return celsiusTemp
}

function changeToCelsius(event) {
  event.preventDefault()
  let higherTemp = document.querySelector('#temperature-high-first').innerText
  let lowerTemp = document.querySelector('#temperature-low-first').innerText

  let celsiusTemperatureHigh = calculateToCelsius(higherTemp)
  document.querySelector(
    '#temperature-high-first',
  ).innerHTML = celsiusTemperatureHigh
  let celsiusTemperatureLow = calculateToCelsius(lowerTemp)
  document.querySelector(
    '#temperature-low-first',
  ).innerHTML = celsiusTemperatureLow
}

let changedTempCelsius = document.querySelector('#celsius')
changedTempCelsius.addEventListener('click', changeToCelsius)

function calculateToFarenheit(temp) {
  let farenheitTemp = Math.round((temp * 9) / 5 + 32)
  return farenheitTemp
}

function changeToFarenheit(event) {
  event.preventDefault()
  let higherTemp = document.querySelector('#temperature-high-first').innerText
  let lowerTemp = document.querySelector('#temperature-low-first').innerText

  let farenhajtTemperatureHigh = calculateToFarenheit(higherTemp)
  document.querySelector(
    '#temperature-high-first',
  ).innerHTML = farenhajtTemperatureHigh

  let farenhajtTemperatureLow = calculateToFarenheit(lowerTemp)
  document.querySelector(
    '#temperature-low-first',
  ).innerHTML = farenhajtTemperatureLow
}

let changedTempFarenheit = document.querySelector('#farenheit')
changedTempFarenheit.addEventListener('click', changeToFarenheit)
