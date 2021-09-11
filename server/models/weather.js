const axios = require("axios");
const zipCodeGeoJson = require("../assets/zip-codes-to-geo-coords.json");
const get = async (zipCode, cb) => {
    let [lat, lon] = zipCodeGeoJson[zipCode];
    try {
        let uvRes = await getUv(lon, lat);
        let uvi = uvRes.current.uvi;

        const url = `https://api.openweathermap.org/data/2.5/forecast?zip=${zipCode}&units=imperial&appid=${process.env.API_KEY}`;
        let response = await axios.get(url);
        const picked = (({ list, city }) => ({ list, city }))(response.data);

        picked.uvi = uvi;
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
module.exports = {
    get,
};
