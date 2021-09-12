const axios = require("axios");
const zipCodeGeoJson = require("../../assets/zip-codes-to-geo-coords.json");
const get = async (zipCode, cb) => {
    let [lat, lon] = zipCodeGeoJson[zipCode];
    try {
        let uvRes = await getUv(lon, lat);
        let uvi = uvRes.current.uvi;
        const url = `https://api.openweathermap.org/data/2.5/forecast?zip=${zipCode}&units=imperial&appid=${process.env.API_KEY}`;
        let response = await axios.get(url);
        const picked = {
            list: reduceFunc(response.data.list),
            city: response.data.city.name,
            timezone: response.data.city.timezone,
            currUvi: uvi,
            geoCoords: { lat, lon },
        };
        cb(null, picked);
    } catch (error) {
        throw new Error("failed to get data", error);
    }
};

const getUv = async (lon, lat) => {
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,daily&appid=${process.env.API_KEY}`;
    let response = await axios.get(url);
    if (response.error) {
        throw new Error("failed to get data", response.error);
    }

    return response.data;
};
//move to util later

const reduceFunc = (list) => {
    list = list.reduce((acc, curr) => {
        const { main, weather, dt_txt } = curr;
        let temp = main.temp;
        delete main.temp;
        curr = {
            temp,
            miscInfo: main,
            weather: weather[0].main,
            weatherIcon: weather[0].icon,
            weatherDescription: weather[0].description,
        };
        let date = dt_txt.slice(0, 10);
        let time = Number(dt_txt.slice(11, 13));
        let dayOrNight =
            time === 0
                ? "12am"
                : time < 12
                ? `${time}am`
                : time === 12
                ? "12pm"
                : `${time - 12}pm`;

        let obj = {};
        obj[dayOrNight] = curr;
        acc[date] ? (acc[date] = [...acc[date], obj]) : (acc[date] = [obj]);
        return acc;
    }, {});
    return list;
};
module.exports = {
    get,
};
