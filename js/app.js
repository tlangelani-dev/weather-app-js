const api = {
    key: '06e39ef9e948e089ef3d3e0fc73f8913',
    baseUrl: 'https://api.openweathermap.org/data/2.5'
};

const searchBox = document.querySelector('.search-box');
searchBox.addEventListener('keypress', setQuery);

function setQuery(e) {
    if (e.keyCode === 13) {
        getResults(searchBox.value);
    }
}

function getResults(query) {
    fetch(`${api.baseUrl}/weather?q=${query}&units=metric&APPID=${api.key}`).then(weather => {
        return weather.json();
    }).then(displayResult);
}

function displayResult(data) {
    console.log(data);
    
    let city = document.querySelector('.location .city');
    city.innerText = `${data.name}, ${data.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${round(data.main.temp)}<span>°C</span>`;

    let weather = document.querySelector('.current .weather');
    weather.innerText = data.weather[0].main;

    let hiLow = document.querySelector('.hi-low');
    hiLow.innerText = `${round(data.main.temp_min)}°C / ${round(data.main.temp_max)}°C`;
}

function round(num) {
    return Math.round(num);
}

function dateBuilder(d) {
    let months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${day}, ${date} ${month} ${year}`;
}
