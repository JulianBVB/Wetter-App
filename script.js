const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentWeatherItemsEl = document.getElementById('current-weather-items');
const timezone = document.getElementById('time-zone');
const countryEl = document.getElementById('country');
const weatherForecastEl = document.getElementById('weather-forecast');
const currentTempEl = document.getElementById('current-temp');


const days = ['Sonntag', 'Montay', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag',];
const months = ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez',];

const API_KEY = '4a03b5e4e4070db679630ac243f10e6a'

setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const minutes = time.getMinutes();

    timeEl.innerHTML = (hour < 10? '0'+hour: hour) + ':' + (minutes < 10? '0' + minutes: minutes) + ' ' + `<span id="am-pm">Uhr</span>`

    dateEl.innerHTML = days[day] + ', ' + date + ' ' + months[month];

}, 1000);

getWeatherData()
function getWeatherData() {

    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=50.7412021&lon=8.2065505&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {
        console.log(data)
        showWeatherData(data);
    })
}


function showWeatherData(data) {
    let { humidity, pressure, sunrise, sunset, wind_speed } = data.current;


    currentWeatherItemsEl.innerHTML =
    `
    <div class="weather-item">
    <div>Luftfeuchtigkeit</div>
    <div>${humidity}%</div>
    </div>

    <div class="weather-item">
    <div>Pressure</div>
    <div>${pressure}</div>
    </div>

    <div class="weather-item">
    <div>Windgeschwindigkeit</div>
    <div>${wind_speed}</div>
    </div>

    <div class="weather-item">
    <div>Sonnenaufgang</div>
    <div>${window.moment(sunrise * 1000).format('HH:mm a')}</div>
    </div>

    <div class="weather-item">
    <div>Sonnenuntergang</div>
    <div>${window.moment(sunset * 1000).format('HH:mm a')}</div>
    </div>
    `;

    let otherDayForecast = ''
    data.daily.forEach((day, idx) => {
        if (idx == 0) {
            currentTempEl.innerHTML = `
            
            <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@4x.png" alt="weather icon" class="w-icon">
            <div class="other">
                <div class="day">${window.moment(day.dt * 1000).format('ddd')}</div>
                <div class="temp">Nacht - ${day.temp.night}&#176; C</div>
                <div class="temp">Tag - ${day.temp.day}&#176; C</div>
            </div>
            `

        } else {
            otherDayForecast += `
            <div class="weather-forecast-item">
                <div class="day">${window.moment(day.dt * 1000).format('ddd')}</div>
                <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
                <div class="temp">Nacht - ${day.temp.night}&#176; C</div>
                <div class="temp">Tag - ${day.temp.day}&#176; C</div>
            </div>
    
            `
        }
    })

    weatherForecastEl.innerHTML = otherDayForecast;
}