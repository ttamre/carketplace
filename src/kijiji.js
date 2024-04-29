/**
 * Web scraper for kijiji auto listings
 * 
 * Author: Tem Tamre
 * Contact: temtamre@gmail.com
 */

const formatUtils = require('./format');
const sqlite3 = require('sqlite3').verbose();

/**
 * Searches through test database and filters based on form data
 * 
 * @param   {req.body}  formData 
 * @returns {Array}     filteredData    array of car objects
 */
function searchTestDatabase(formData) {
    // TODO validate + sanitize formData before using in database query

    // Build SQL command based on form data
    let query = 'SELECT * FROM cars WHERE 1=1';
    let params = [];

    // Filter year
    if (formData["year"]) {
        // Determine if an operator is present (=, !, <, >, +, -)
        let operator_map = {"+": ">=", "-": "<=", "!": "!=", "<": "<", ">": ">"};

        // If operator is present, use it and parse year around it
        if (isNaN(formData["year"][0]) && "!=+-<>".includes(formData["year"][0])) {
            let operator = operator_map[formData["year"][0]]
            query += ` AND year ${operator} ?`;
            params.push(formData["year"].substring(1))
        } else if (!isNaN(formData["year"])) {
            query += ' AND year = ?';
            params.push(formData["year"])
        } else {
            console.error("received invalid year from form data");
        }
    }

    // Filter make, mode, price, drivetrain, and transmission
    if (formData["make"]) {
        query += ' AND make = ?';
        params.push(formData["make"])
    }
    if (formData["model"]) {
        query += ' AND model = ?';
        params.push(formData["model"])
    }
    if (formData["price"]) {
        query += ' AND price =< ?';
        params.push(formData["price"])
    }
    if (formData["drivetrain"] && formData["drivetrain"] !== "*") {
        query += ' AND drivetrain = ?';
        params.push(formData["drivetrain"])
    }
    if (formData["transmission"] && formData["transmission"] !== "*") {
        query += ' AND transmission = ?';
        params.push(formData["transmission"])
    }


    // Query data from the database
    // let data = []
    const db = new sqlite3.Database('data/database.db', sqlite3.OPEN_READ, (err) => {
        if (err) {
            console.error(err.message);
        }});

    executeQuery(db, query, params)
        .then((rows) => {
            return rows
        })
        .catch((err) => {
            console.error(err)
        })
        .finally(() => {
            db.close((err) => {
                if (err) {
                    console.error(err.message)
                }
            })
        })
}

function executeQuery(db, query, params) {
    return new Promise((resolve, reject) => {
        db.all(query, params, (err, rows) => {
            if (err) {
                reject(err);
            }
            resolve(rows);
        })
    })
}

/**
 * Searches through test json data and filters based on form data
 * 
 * @param   {req.body}  formData 
 * @returns {Array}     filteredData    array of car objects
 */
function searchTestData(formData) {
    let data = require('../data/test_data.json');
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

module.exports = {searchTestData, searchTestDatabase};