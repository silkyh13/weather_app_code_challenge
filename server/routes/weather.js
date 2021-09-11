const router = require("express").Router();
const weather = require("../controllers/weather");

router.get("/weather", weather.get);

module.exports = router;
