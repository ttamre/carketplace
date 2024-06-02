/**
 * Server entrypoint
 *
 * Author: Tem Tamre
 * Contact: temtamre@gmail.com
 */

const express = require("express")
const bodyParser = require("body-parser")
const kijiji = require("./kijiji")

const app = express()
app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.set("view engine", "ejs")

// GET main webpage
app.get("/", (req, res) => {
  res.render("index", { cars: [] })
})

// POST search results based on request form data
app.post("/", (req, res) => {
  let cars = kijiji.searchTestDatabase(req.body)
  res.render("index", { cars: cars })
})


app.listen('8080', () => {
  console.info(`Listening at http://localhost:8080...`)
})
