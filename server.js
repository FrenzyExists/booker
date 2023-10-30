const express = require("express");
const cors = require("cors");
const compression = require("compression");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(compression());

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the world's most unreliable API! I hope you die in hell :)" });
});

require("./app/routes/user.routes.js")(app);
require("./app/routes/room.routes.js")(app);
require("./app/routes/reservation.routes.js")(app);

// set port, listen for requests
const PORT = process.env.API_PORT || 8082;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});