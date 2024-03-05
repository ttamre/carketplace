/**
 * Web scraper for kijiji auto listings
 * 
 * Author: Tem Tamre
 * Contact: temtamre@gmail.com
 */

const fs = require('fs');
const formatUtils = require('./format');


/**
 * Searches through test data and filters based on form data
 * 
 * @param   {req.body}  formData 
 * @returns {Array}     filteredData    array of car objects
 */
function searchTestData(formData) {
    let data = require('./test_data.json');
    let filteredData = data;

    // Filter year
    if (formData["year"]) {
        // First, determine if an operator is present (=, !, <, <=, >, >=)
        let operator = null;
        if (isNaN(formData["year"][0])) {
            operator = formData["year"][0];
            formData["year"] = +(formData["year"].substring(1))
        }

        // Then, filter data based on operator
        if (!operator || operator === "=") {
            filteredData = filteredData.filter((car) => car["year"] == formData["year"]);
        } else if (operator === "<") {
            filteredData = filteredData.filter((car) => car["year"] < formData["year"]);
        } else if (operator === ">") {
            filteredData = filteredData.filter((car) => car["year"] > formData["year"]);
        } else if (operator === "!") {
            filteredData = filteredData.filter((car) => car["year"] != formData["year"]);
        } else if (operator === "-") {
            filteredData = filteredData.filter((car) => car["year"] <= formData["year"]);
        } else if (operator === "+") {
            filteredData = filteredData.filter((car) => car["year"] >= formData["year"]);
        } else {
            console.error("received invalid year from form data");
        }
    }

    // Filter make, mode, price, drivetrain, and transmission
    if (formData["make"]) {
        filteredData = filteredData.filter((car) => car["make"] === formData["make"]);
    }
    if (formData["model"]) {
        filteredData = filteredData.filter((car) => car["model"] === formData["model"]);
    }
    if (formData["price"]) {
        filteredData = filteredData.filter((car) => car["price"] <= +formData["price"]);
    }
    if (formData["drivetrain"] && formData["drivetrain"] !== "*") {
        filteredData = filteredData.filter((car) => car["drivetrain"] === formData["drivetrain"]);
    }
    if (formData["transmission"] && formData["transmission"] !== "*") {
        filteredData = filteredData.filter((car) => car["transmission"] === formData["transmission"]);
    }

    // Format price
    filteredData.forEach((car) => {
        if (typeof car["price"] == 'number') {
            car["price"] = formatUtils.formatPrice(car["price"], "CAD");
        }
    });

    return filteredData;
}

module.exports = {searchTestData};