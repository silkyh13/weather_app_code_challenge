const weather = require("../models/weather");

const get = (req, res) => {
    weather.get(req.query.zipCode, (err, response) => {
        if (err) {
            res.status(500).send(err);
        }
        res.send(response);
    });
};

const testGet = (req, res) => {
    weather.testGet(req.query.zipCode, (err, response) => {
        if (err) {
            res.status(500).send(err);
        }
        res.send(response);
    });
};
module.exports = {
    get,
    testGet,
};
