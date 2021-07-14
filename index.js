const express = require("express");
const app = express();
const path = require("path");

app.use(express.json());
const hbs = require("express-handlebars");
const { callbackify } = require("util");

//serving static files
app.use(express.static(path.join(__dirname, "public")));

//connect mongodb database
require("./server/database/db")();

//set up template engine
app.set("view engine", "hbs");
app.engine(
  "hbs",
  hbs({
    extname: "hbs",
    defaultView: "default",
    layoutsDir: path.join(__dirname, "views"),
    partialsDir: path.join(__dirname, "views/partials"),
  })
);

//calling router
app.use("/", require("./server/router/router.js"));

app.listen(3002);
console.log("listening to port 3002");
