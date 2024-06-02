/**
 * Main carketplace functionality
 * 
 * Author: Tem Tamre
 * Contact: temtamre@gmail.com
 */

const Database = require('better-sqlite3')
const db_path = 'data/database.db'

/**
 * Searches through test database and filters based on form data
 * 
 * @param   {req.body}  formData 
 * @returns {Array}     filteredData    array of car objects
 */
function searchTestDatabase(formData) {
    // Form data validation
    let formDataError = validateFormData(formData)
    if (formDataError) {
        console.error(formDataError)
        return []
    }

    // Build SQL command based on form data
    let query:string = 'SELECT * FROM cars WHERE 1=1'
    let params:string[] = []

    // Filter year
    if (formData["year"]) {
        // Determine if an operator is present (=, !, <, >, +, -)
        let operator_map:Record<string, string> = {"+": ">=", "-": "<=", "!": "!=", "<": "<", ">": ">"}

        // If operator is present, use it and parse year around it
        if (isNaN(formData["year"][0]) && "!=+-<>".includes(formData["year"][0])) {
            let operator:string = operator_map[formData["year"][0]]
            query += ` AND year ? ?`
            params.push(operator)
            params.push(formData["year"].substring(1))
        } else if (!isNaN(formData["year"])) {
            query += ' AND year = ?'
            params.push(formData["year"])
        } else {
            console.error("received invalid year from form data")
        }
    }

    // Filter make, mode, price, drivetrain, and transmission
    if (formData["make"]) {
        query += ' AND make = ?'
        params.push(formData["make"])
    }
    if (formData["model"]) {
        query += ' AND model = ?'
        params.push(formData["model"])
    }
    if (formData["price"]) {
        query += ' AND price <= ?'
        params.push(formData["price"])
    }
    if (formData["drivetrain"] && formData["drivetrain"] !== "*") {
        query += ' AND drivetrain = ?'
        params.push(formData["drivetrain"])
    }
    if (formData["transmission"] && formData["transmission"] !== "*") {
        query += ' AND transmission = ?'
        params.push(formData["transmission"])
    }
    
    const db = new Database(db_path)
    const preparedQuery = db.prepare(query)
    const selectTransaction = db.transaction((params) => {
        return preparedQuery.all(params)
    }) 
    
    let results = selectTransaction(params)

    results.forEach((car) => {
        if (typeof car["price"] == 'number') {
            car["price"] = formatPrice(car["price"], "CAD")
        }
    })

    return results
}

/**
* Validates form data to prevent SQL injection and XSS attacks
* @param    {req.body}  formData    form data from POST request
* @returns  {Error/null}            error if invalid data, null otherwise
*/
function validateFormData(formData) {
    // year (ignoring first character due to operator)
    if (formData["year"].substring(1) && isNaN(formData["year"].substring(1))) {
        return Error("Invalid year")
    }

    // TODO make (XSS + SQL injection) - dont sanitize, just reject if invalid

    // TODO model (XSS + SQL injection) - dont sanitize, just reject if invalid

    // price (is number type, but nice to have validation for extra safety)
    if (formData["price"] && isNaN(formData["price"])) {
        return Error("Invalid price")
    }
    // drivetrain and transmission are dropdowns, so no need to validate
}


/**
 * Get a properly formatted price tag given a price and currency
 * @param {number} price    given price
 * @param {string} currency one of ["CAD", "USD", "GBP"]
 */
function formatPrice(price, currency) {
    let currencyMap:Record<string, string> = {
        "CAD": "en-CA",
        "USD": "en-US",
        "GBP": "en-GB"
    }

    let numberFormat:Intl.NumberFormat = new Intl.NumberFormat(
        currencyMap[currency],
        {style: 'currency', 'currency': currency})

    return numberFormat.format(price)
}


module.exports = {searchTestDatabase}