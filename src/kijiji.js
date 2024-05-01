/**
 * Web scraper for kijiji auto listings
 * 
 * Author: Tem Tamre
 * Contact: temtamre@gmail.com
 */

const Database = require('better-sqlite3');
const db_path = 'data/database.db';

/**
 * Searches through test database and filters based on form data
 * 
 * @param   {req.body}  formData 
 * @returns {Array}     filteredData    array of car objects
 */
export function searchTestDatabase(formData) {
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
        query += ' AND price <= ?';
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
    
    const db = new Database(db_path);
    const preparedQuery = db.prepare(query);
    const selectTransaction = db.transaction((params) => {
        return preparedQuery.all(params);
    }); 
    
    let results = selectTransaction(params);

    results.forEach((car) => {
        if (typeof car["price"] == 'number') {
            car["price"] = formatPrice(car["price"], "CAD");
        }
    });
}

/**
 * Get a properly formatted price tag given a price and currency
 * @param {number} price    given price
 * @param {string} currency one of ["CAD", "USD", "GBP"]
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