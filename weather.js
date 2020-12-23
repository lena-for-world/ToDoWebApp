const weather = document.querySelector(".js-weather");
const wInfo = weather.querySelector("h1");
const wIcon = document.querySelector(".wImg");
 const COORDS = 'coords';
 const API_KEY = "7212483c52253050e9c79197482c2864";

 function selectWeather(conditionNum) {
    var result = parseInt(conditionNum / 100);
    if(result === 8) {
        var left = conditionNum % 100;
        if(left !== 0) result = 81;
        else result = 8;
    }
    return result;
 }

 function paintIcon(conditionNum) {
    const weatherNum = selectWeather(conditionNum);
    
    wIcon.innerHTML = `<img src='weatherIcons/${weatherNum}.png'>`;
}
 
 function getweather(lat, lng) {
     fetch (
         `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
     ).then(function(response) {
         return response.json();
     }).then(function(json) {
         const realTemperature = json.main.temp;
         const windChill = json.main.feels_like;
         const place = json.name;
         const weatherCondition = json.weather[0].id;
         paintIcon(weatherCondition);
         wInfo.innerText = `${realTemperature} ${windChill} ${place}`;
         console.log(json);
     });
 }

 function saveCoords(positionObj) {
     localStorage.setItem(COORDS, JSON.stringify(positionObj, null, 2))
 }

function handleGeoSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const positionObj = {
        latitude,
        longitude
    };
    saveCoords(positionObj);
    getweather(latitude, longitude);
}

function handleGeoError() {
    console.log("can't upload location");
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null) {
        askForCoords();
    }
    else {
        const parsedCoords = JSON.parse(loadedCoords);
        getweather(parsedCoords.latitude, parsedCoords.longitude);
        console.log(JSON.stringify(parsedCoords, null, 2));
    }
}

function init() {
    loadCoords();
}

init();