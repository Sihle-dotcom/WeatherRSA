
const params = new URLSearchParams(window.location.search);
const lat = params.get('lat');
const lon = params.get('lon');
console.log(lat, lon);

var iframe = document.getElementById('windyFrame');

if(lat !== null && lon !== null){
    iframe.src = `https://embed.windy.com/embed2.html?lat=${lat}&lon=${lon}&detailLat=${lat}&detailLon=${lon}&width=650&height=450&zoom=5&level=surface&overlay=temperature&product=ecmwf&menu=&message=false&marker=&calendar=now&pressure=true&type=map&location=coordinates&detail=false&metricWind=kt&metricTemp=%C2%B0C&radarRange=-1&key=BLAKU9QjGPqX568731bxIOhC64QuSWyF`;
}
else{
    iframe.src = `https://embed.windy.com/embed2.html?lat=20&lon=0.0001&detailLat=20&detailLon=0.0001&width=650&height=450&zoom=2&level=surface&overlay=temperature&product=ecmwf&menu=&message=false&marker=&calendar=now&pressure=true&type=map&location=coordinates&detail=false&metricWind=kt&metricTemp=%C2%B0C&radarRange=-1&key=BLAKU9QjGPqX568731bxIOhC64QuSWyF`;
}

function goBack(){
    window.location.href = 'Index.html';
}

