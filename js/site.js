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
    let operator = null;

    let dt = document.getElementById("formDrivetrain").value;
    let trans = document.getElementById("formTransmission").value;

    if (["<", ">", "=", "!"].includes(year[0])) {
        operator = year[0];
        year = year.slice(1);
    } else if (["+", "-"].includes(year.slice(-1))) {
        operator = year.slice(-1);
        year = year.slice(0,-1);
    }

    return {"year": year, "make": make, "model": model, "price":price,
            "operator": operator, "dt": dt, "trans": trans};
}


/** TODO Search for used cars using a given set of query parameters
 * @param  {Object} params search filters
 * @return {Object} results 
 */
function search(params) {
    let data = generateTestData();
    let filteredData = data;

    if (params["year"]) {
        let operator = params["operator"];
        if (!operator || operator === "=") {
            filteredData = filteredData.filter((car) => car["year"] == params["year"]);
        } else if (operator === "<") {
            filteredData = filteredData.filter((car) => car["year"] < params["year"]);
        } else if (operator === ">") {
            filteredData = filteredData.filter((car) => car["year"] > params["year"]);
        } else if (operator === "!") {
            filteredData = filteredData.filter((car) => car["year"] != params["year"]);
        } else if (operator === "-") {
            filteredData = filteredData.filter((car) => car["year"] <= params["year"]);
        } else if (operator === "+") {
            filteredData = filteredData.filter((car) => car["year"] >= params["year"]);
        } else {
            console.log("ERROR: couldn't read operator");
        }
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
    if (params["dt"] && params["dt"] !== "*") {
        filteredData = filteredData.filter((car) => car["dt"] === params["dt"]);
    }
    if (params["trans"] && params["trans"] !== "*") {
        filteredData = filteredData.filter((car) => car["trans"] === params["trans"]);
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
        let cellDT = row.insertCell();
        let cellTrans = row.insertCell();
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
        cellDT.appendChild(document.createTextNode(data[i]["dt"]));
        cellTrans.appendChild(document.createTextNode(data[i]["trans"]));
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
        "toyota": ["camry", "corolla", "supra", "mr2", "RAV4", "highlander", "gr86", "tundra"],
        "lexus": ["ls300", "ls400", "is300", "is400", "RC", "RC F", "LX"],
        "bmw": ["2 series", "3 series", "m2", "M4", "Z4", "Z", "X2", "X3", "X4"],
        "porsche": ["718", "964", "911", "991", "targa 4", "taycan", "panamera", "macan", "cayenne"],
        "lancia": ["delta", "lambda", "2000", "037", "ypsilon", "voyager", "stratos", "flavia", "appia", "flamina"],
        "mazda": ["2", "3", "6", "CX-30", "CX-50", "CX-60", "RX-7", "RX-8"],
        "honda": ["civic", "Civic Type-R", "accord", "integra", "CR-V", "nsx", "s2000", "prelude"],
        "nissan": ["altima", "sentra", "skyline", "pathfinder", "rogue", "240z", "350z", "silvia"],
        "ford": ["focus", "escort", "mustang", "bronco", "escape", "f-150", "f-250", "f-350", "explorer"],
        "gmc": ["hummer", "yukon", "sierra", "5500"]
    }

    dt = ["RWD", "FWD", "AWD"];
    trans = ["auto", "manual"];

    // Generate random combinations of year/make/model and a random price
    // for (let i = 0; i < Object.keys(make_models).length; i++) {
    for (make in make_models) {
        for (let i = 0; i < make_models[make].length; i++) {
            for (let j = 0; j < 2; j++) {
                data.push(formatData({
                    "year": Math.random() * (2025 - 1980) + 1980,
                    "make": make,
                    "model": make_models[make][i],
                    "price": Math.floor(Math.random() * 150) * 100,
                    "dt": dt[Math.floor(Math.random() * dt.length)],
                    "trans": trans[Math.floor(Math.random() * trans.length)]
                }))
            }
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
    // drivetrain and transmission don't need formatting (at the moment)

    // make
    if (["ALPINA", "BMW", "MINI", "GMC", "AMC"].includes(make.toUpperCase())) {
        make = make.toUpperCase();
    } else {
        make = make[0].toUpperCase() + make.slice(1);
    }

    // model
    if (model.match(/^\d/) || model.match(/^[e]\d{2}/ || model.match(/^[ls]\d{2}/))) {
        // pass
    } else if (["MR2", "M2", "M3", "M4", "GR86"].includes(model.toUpperCase())) {
        model = model.toUpperCase();
    } else {
        model = model[0].toUpperCase() + model.slice(1);
    }

    return {"year": parseInt(year), "make": make, "model": model, "price": parseFloat(price), "dt": car["dt"], "trans": car["trans"]}
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