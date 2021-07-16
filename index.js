const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");

app.use(express.json());
const hbs = require("express-handlebars");
const { callbackify } = require("util");

//serving static files
app.use(express.static(path.join(__dirname, "public")));

//connect mongodb database
require("./server/database/db")();
require("dotenv").config();

//cors origin URL - Allow inbound traffic from origin
corsOptions = {
  origin: "https://favouritetech.herokuapp.com/",
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

//set up template engine
app.set("view engine", "hbs");

const handleEngine = hbs.create({
  defaultLayout: "main",
  extname: ".hbs",
  layoutsDir: path.join(__dirname, "views/"),
  partialsDir: path.join(__dirname, "views/partials"),
});

app.engine("hbs", handleEngine.engine);

// calling router
app.use(
  "/",
  require("./server/router/router.js"),
  require("./server/router/adminRouter.js")
);

const MY_PORT = process.env.PORT;

app.listen(MY_PORT, () => console.log(`Server running on port ${MY_PORT}`));
