const router = require("express").Router();
const weather = require("../controllers/weather");

router.get("/weather", weather.get);
router.get("/test", weather.testGet);

module.exports = router;
