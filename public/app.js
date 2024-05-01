/**
 * Server entrypoint
 *
 * Author: Tem Tamre
 * Contact: temtamre@gmail.com
 */

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
  let cars = kijiji.searchTestDatabase(req.body);
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

app.listen('5000', () => {
  console.info(`Listening at http://localhost:5000...`);
});
