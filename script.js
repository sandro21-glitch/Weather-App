'use strict';


let weather = {
    apiKey: '7bef1a63872e336f5d4957ea1c3d0e40',
    fetchWeather: function(city){
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}`)
        .then((res) => res.json())
        .then((data) => this.innerDisplay(data))
        .catch(err => alert('City not found, Try again✌'))
    },
    innerDisplay: function(data){
        const { name } = data;
        const { temp, humidity } = data.main;
        const { description, icon } = data.weather[0];
        const { speed } = data.wind;

        document.querySelector('.city').innerText = `Weather in ${name}`;
        document.querySelector('.temp').innerText = `${Math.round(temp)}℃`;
        document.querySelector('.icon').src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
        document.querySelector('.description').innerText = `${description}`;
        document.querySelector('.humidity').innerText = `Humidity: ${humidity}`;
        document.querySelector('.wind').innerText = `Wind Speed: ${speed}`;
        document.querySelector('.weather').classList.remove('loading');
        document.querySelector('.card').classList.remove('before');
        document.body.style.backgroundImage = `url(https://source.unsplash.com/1600x900/?${name})`;
    },

    search: function(){
        this.fetchWeather(document.querySelector('.search-bar').value);
    },
}

document.querySelector('.search button')
.addEventListener('click', function(){
    weather.search();
});

document.querySelector('.search')
.addEventListener('keyup', function(e){
    if(e.key === 'Enter'){
        weather.search();
    }
});
