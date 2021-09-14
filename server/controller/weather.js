const weather = require("../model/weather");

const get = (req, res) => {
    weather.get(req.query.zipCode, (err, response) => {
        if (err) {
            res.status(500).send(err);
        }
        res.send(response);
    });
};

module.exports = {
    get,
};
