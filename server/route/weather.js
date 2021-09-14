const router = require("express").Router();
const weather = require("../controller/weather");

router.get("/weather", weather.get);

module.exports = router;
