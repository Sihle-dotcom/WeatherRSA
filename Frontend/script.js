var currentLat = null;
var currentLon = null;

function cleanAndProcess(input) {
    input = input.trim();
    if(input == ""){
        console.log("Input is empty");
        return null;
    }
    return input;

}
function search(){
    var city = cleanAndProcess(document.getElementById('userInput').value);
    if(city === null){
        return;
    }
    console.log("city value is:", city, "length:", city.length);
    fetch('http://localhost:3000/weatherRSA?city=' + city)
    .then(function(response) {
      return response.json();
    })
    .then(function(data){
        if(data.error){
            console.error(data.error);
            return;
        }
        document.getElementById('city').innerText = data.city;
        document.getElementById('temperature').innerText = Math.round(data.temperature) + '°';
        document.getElementById('condition').innerText = data.condition;
        document.getElementById('highLow').innerText = 'H:' + Math.round(data.highTemp) + '° L:' + Math.round(data.lowTemp) + '°';
        currentLat = data.lat;
        currentLon = data.lon;
        console.log(data);
    })
    .catch(function(error){
        console.error('Error:', error);
    });
    console.log(city);

    fetch('http://localhost:3000/weatherRSA/forecast?city=' + city)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        if(data.error){
            console.error(data.error);
            return;
        }
        var html = '';
        for(var i = 0; i < data.forecast.length; i++){
            var item = data.forecast[i];
            html += '<div class="forecast-row">' +
                '<span class="forecast-day">' + item.date + '</span>' +
                '<img class="forecast-icon" src="https://openweathermap.org/img/wn/' + item.icon + '@2x.png" alt="' + item.condition + '"/>' +
                '<span class="forecast-temps"><span class="high">' + Math.round(item.highTemp) + '°</span><span class="low">' + Math.round(item.lowTemp) + '°</span></span>' +
                '</div>';
        }
        document.getElementById('dailyForecast').innerHTML = html;
    })
    .catch(function(error){
        console.error('Error:', error);

    });
}

function openMap(){
    if(currentLat !== null && currentLon !== null){
        //navigation
        window.location.href = 'map.html?lat=' + currentLat + '&lon=' + currentLon;
    }
    else{
        window.location.href = 'map.html';
    }
}