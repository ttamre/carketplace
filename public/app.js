/**
 * Server entrypoint
 *
 * Author: Tem Tamre
 * Contact: temtamre@gmail.com
 */

require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const kijiji = require("../src/kijiji");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("view engine", "ejs");

// Serve main webpage
app.get("/", (req, res) => {
  res.render("index", { cars: [] });
});

// Get user form data via POST request
app.post("/", (req, res) => {
  let cars = kijiji.searchTestData(req.body);
  console.log("cars:", cars)
  res.render("index", { cars: cars });
});

// Serve login page
app.get("/login", (req, res) => {
  res.render("login", {});
});

// Get user form data via POST request
app.post("/login", (req, res) => {
  res.render("login", {});
});

app.listen(process.env.PORT, () => {
  console.info(`Listening at http://localhost:${process.env.PORT}...`);
});
