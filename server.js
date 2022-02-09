require("dotenv").config();

var express = require("express");
var app = express();
var cors = require("cors");
const { response } = require("express");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

const SERVER_PORT = process.env.PORT || 8000;

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

let timeObj = {};
app.get("/api", (req, res) => {
  // timeObj["unix"] = new Date().getTime();
  // timeObj["utc"] = new Date().toUTCString();
  timeObj = { unix: new Date().getTime(), utc: new Date().toUTCString() };

  res.json(timeObj);
});

app.get("/api/:date", (req, res) => {
  let date = req.params.date; //set date to e equals to req params

  if (!!Date.parse(date)) {
    // check if date is a valid date string
    timeObj = {
      unix: new Date(date).getTime(),
      utc: new Date(date).toUTCString(),
    };
  } else {
    date = parseInt(date); // parse string to number

    timeObj = {
      unix: new Date(date).getTime(),
      utc: new Date(date).toUTCString(),
    };
  }

  if (!timeObj["unix"] || !timeObj["utc"]) {
    // use bracket notation check date validity
    res.json({ error: "Invalid Date" });
  }
  res.json(timeObj);
});

// listen for requests :)
app.listen(SERVER_PORT, () => {
  console.log(`Your app is listening on port ${SERVER_PORT}`);
});
