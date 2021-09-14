require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000;
const weather = require("./server/route/weather");

app.use(
    express.json({
        type: "*/*",
    })
);
// app.use(express.urlencoded({ extended: true }));
app.use("/", weather);
app.use(express.static("public"));
app.get("*", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
