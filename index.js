const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//serving static files
app.use(express.static(path.join(__dirname, "public")));

//connect mongodb database
require("./server/database/db")();
require("dotenv").config();

//method override
const methodOverride = require("method-override");

app.use(methodOverride("_method"));

//cors origin URL - Allow inbound traffic from origin
corsOptions = {
  origin: "https://favouritetech.herokuapp.com/",
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

//set up template engine
app.set("view engine", "ejs");

// calling router
app.use(
  "/",
  require("./server/router/router.js"),
  require("./server/router/adminRouter.js")
);

const MY_PORT = process.env.PORT;

app.listen(MY_PORT, () => console.log(`Server running on port ${MY_PORT}`));
