const axios = require("axios");

const get = async (zipCode, cb) => {
    const url = `https://api.openweathermap.org/data/2.5/forecast?zip=${zipCode},&appid=${process.env.API_KEY}`;
    let response = await axios.get(url);

    if (response.error) {
        throw new Error("failed to get data", response.error);
    }

    cb(null, response.data);
};
module.exports = {
    get,
};
