
const express = require('express');
const axios = require('axios');
const router = express.Router();
router.get('/',async(req, res) => {
    const city = req.query.city;
    const apiKey = process.env.OPENWEATHERMAP_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    try{
        const result = await axios.get(url);
        res.json({city: result.data.name, 
            temperature: result.data.main.temp, 
            highTemp: result.data.main.temp_max, 
            lowTemp: result.data.main.temp_min, 
            condition: result.data.weather[0].description, icon: result.data.weather[0].icon, 
            lat: result.data.coord.lat, 
            lon: result.data.coord.lon});
    } catch (error){
        res.status(404).json({error: 'City not found' });
    }

});

router.get('/forecast', async(req, res) => {
    const city = req.query.city;
    const apiKey = process.env.OPENWEATHERMAP_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    try{
        const result = await axios.get(url);

        const dailyList = result.data.list.filter(function(item){
        return item.dt_txt.includes('12:00:00');
    });

        const forecast = dailyList.map(function(item){
            return{date: new Date(item.dt_txt).toLocaleDateString('en-US', { weekday: 'long' }), temperature: item.main.temp, highTemp: item.main.temp_max, lowTemp: item.main.temp_min, condition: item.weather[0].description, icon: item.weather[0].icon};
        });
        console.log(result.data.list);
        console.log(dailyList);
        res.json({ forecast: forecast });
    } catch (error){
        res.status(404).json({error: 'City not found' });
    }
});  
module.exports = router;

