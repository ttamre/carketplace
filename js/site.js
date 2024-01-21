/**
 * Main website functionality
 * 
 * Author: Tem Tamre
 * Contact: temtamre@gmail.com
 */


// import { formatPrice } from "./util.js";


document.addEventListener("DOMContentLoaded", connectButtons);


/** Connect all event listeners */
function connectButtons() {
    let formSubmit = document.getElementById("formSubmit")
    formSubmit.addEventListener('click', () => {
        document.getElementById("divResults").style.visibility = "visible";
        let params = getFormData();
        let data = search(params);
        populateTable(data);
    });
}


/** Get user form data */
function getFormData() {
    let year = document.getElementById("formYear").value;
    let make = document.getElementById("formMake").value;
    let model = document.getElementById("formModel").value;
    let price = document.getElementById("formPrice").value;

    // string validation (TODO expand)
    // if (!year) {year = "*"}
    // if (!make) {make = "*"}
    // if (!model) {model = "*"}
    // if (!price) {price = "*"}

    return {"year": year, "make": make, "model": model, "price": price};
}


/** TODO Search for used cars using a given set of query parameters
 * @param  {Object} params search filters
 * @return {Object} results 
 */
function search(params) {
    let data = generateTestData();
    let filteredData = data;

    if (params["year"]) {
        filteredData = filteredData.filter((car) => car["year"] >= params["year"]);
    }
    if (params["make"]) {
        filteredData = filteredData.filter((car) => car["make"] === params["make"]);
    }
    if (params["model"]) {
        filteredData = filteredData.filter((car) => car["model"] === params["model"]);
    }
    if (params["price"]) {
        filteredData = filteredData.filter((car) => car["price"] <= params["price"]);
    }

    return filteredData;
}


/** Populates the results table based on given JSON search results
 * @param {list} data list of search results
 */
function populateTable(data) {
    let table = document.getElementById("tableResults")
    let old_tbody = document.getElementById("tableBody");
    let new_tbody = document.createElement("tbody");

    // if table has a body, replace it
    if (document.getElementById("tableBody")) {
        old_tbody.replaceWith(new_tbody);
        new_tbody.setAttribute("id", "tableBody");
    // if not, add one
    } else {
        new_tbody.setAttribute("id", "tableBody");
        table.appendChild(new_tbody);
    }

    for (let i = 0; i < data.length; i++) {
        // Create table row/cells
        let row = new_tbody.insertRow();
        let cellYear = row.insertCell();
        let cellMake = row.insertCell();
        let cellModel = row.insertCell();
        let cellPrice = row.insertCell();
        let cellView = row.insertCell();

        // Create view button
        let viewButton = document.createElement("button");
        viewButton.textContent = "view";
        viewButton.addEventListener("click", () => {
            alert(`${cellYear.textContent} ${cellMake.textContent} ${cellModel.textContent}\n${cellPrice.textContent}`)
        });

        // Add data/view button to cells
        cellYear.appendChild(document.createTextNode(data[i]["year"]));
        cellMake.appendChild(document.createTextNode(data[i]["make"]));
        cellModel.appendChild(document.createTextNode(data[i]["model"]));
        cellPrice.appendChild(document.createTextNode(formatPrice(data[i]["price"], "CAD")));
        cellView.appendChild(viewButton);
    }
}



// ------------------------------------------
// TODO separate below functions into UTIL.js
// ------------------------------------------


/** Generate test data */
function generateTestData() {
    data = []

    // define some test make/model pairs
    make_models = {
        "toyota": ["camry", "corolla", "supra", "mr2"],
        "lexus": ["ls300", "ls400"],
        "bmw": ["2 series", "3 series", "m2", "M4"],
        "porsche": ["964", "911", "991", "targa 4"],
        "lancia": ["delta", "lambda", "2000", "037"]
    }

    // Generate random combinations of year/make/model and a random price
    // for (let i = 0; i < Object.keys(make_models).length; i++) {
    for (make in make_models) {
        for (let i = 0; i < make_models[make].length; i++)
            for (let year = 1980; year < 2025; year += 4) {
                data.push(formatData({
                    "year": year,
                    "make": make,
                    "model": make_models[make][i],
                    "price": Math.floor(Math.random() * 150) * 100
                }))
            }
    }
    return data;
}


/** 
 * Formats text fields within a car object
 * @param  {Object} car
 * @return {Object} newly-formatted car object
 */
function formatData(car) {
    let year = car["year"];
    let make = car["make"];
    let model = car["model"];
    let price = car["price"];

    // make
    if (["ALPINA", "BMW", "MINI", "GMC", "AMC"].includes(make.toUpperCase())) {
        make = make.toUpperCase();
    } else {
        make = make[0].toUpperCase() + make.slice(1);
    }

    // model
    if (model.match(/^\d/) || model.match(/^[e]\d{2}/)) {
        // pass
    } else if (["MR2", "M2", "M3", "M4"].includes(model.toUpperCase())) {
        model = model.toUpperCase();
    } else {
        model = model[0].toUpperCase() + model.slice(1);
    }

    return {"year": parseInt(year), "make": make, "model": model, "price": parseFloat(price)}
}


/**
 * Get a properly formatted price tag given a price and currency
 * @param {number} price    given price
 * @param {string} currency currency of the given price
 */
function formatPrice(price, currency) {
    let currencyMap = {
        "CAD": "en-CA",
        "USD": "en-US",
        "GBP": "en-GB"
    };

    let numberFormat = new Intl.NumberFormat(
        currencyMap[currency],
        {style: 'currency', 'currency': currency});

    return numberFormat.format(price);
}