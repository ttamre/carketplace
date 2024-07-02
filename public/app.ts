/**
 * _CARKETPLACE
 * Copyright (C) 2024 Tem Tamre
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 * 
 * 
 * Express routes
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
  let cars = kijiji.searchKijiji(req.body)
  console.log("cars:", cars)
  res.render("index", { cars: cars })
})

export default app