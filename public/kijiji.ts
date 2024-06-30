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
 * Main carketplace functionality
 * 
 * Author: Tem Tamre
 * Contact: temtamre@gmail.com
 */

import BetterSqlite3, { Database, Statement } from "better-sqlite3"

const DB_PATH:string = 'data/database.db'

/**
 * Searches through test database and filters based on form data
 * 
 * @param   {req.body}  formData 
 * @returns {Array}     filteredData    array of car objects
 */
export function searchTestDatabase(formData : object): Record<string, string | number>[] {
    // Form data validation
    let formDataError = validateFormData(formData)
    if (formDataError) {
        console.error(formDataError)
        return []
    }

    // Build SQL command based on form data
    let query = 'SELECT * FROM cars WHERE 1=1'
    let params : string[] = []

    // Filter year
    if (formData["year"]) {
        // Determine if an operator is present (=, !, <, >, +, -)
        let operator_map = {"+": ">=", "-": "<=", "!": "!=", "<": "<", ">": ">", "=": "="}

        // If operator is present, use it and parse year around it
        if (formData["year"][0] in operator_map) {
            let operator = operator_map[formData["year"][0]]
            query += ` AND year ${operator} ?`
            params.push(formData["year"].substring(1))
        // If no operator is present, use default equality operator
        } else if (Number(formData["year"])) {
            query += ' AND year = ?'
            params.push(formData["year"])
        } else {
            console.error("received non-numeric year value")
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
    
    const db = new BetterSqlite3(DB_PATH)
    const preparedQuery = db.prepare(query)
    const selectTransaction : Function = db.transaction((params) => {
        return preparedQuery.all(params)
    }) 
    
    let results : Record<string, string | number>[] = selectTransaction(params)

    // Format prices for each car
    results.forEach((car : Record<string, string | number>) => {
        if (typeof car["price"] == 'number') {
            car["price"] = formatPrice(car["price"], "CAD")
        }
    })

    return results
}

/**
* Validates form data to prevent SQL injection and XSS attacks
* Some validation is done in the query library, but this is an extra layer of security
* @param    {req.body}  formData    form data from POST request
* @returns  {Error/null}            error if invalid data, null otherwise
*/
export function validateFormData(formData : object): Error | undefined {    
    // year (ignoring first character due to operator)
    if (formData["year"] && isNaN(formData["year"].substring(1))) {
        return Error("Invalid year")
    }

    // price (is number type, but nice to have validation for extra safety)
    if (formData["price"] && isNaN(formData["price"])) {
        return Error("Invalid price")
    }
}


/**
 * Get a properly formatted price tag given a price and currency
 * @param {number} price    given price
 * @param {string} currency one of ["CAD", "USD", "GBP"]
 */
export function formatPrice(price:number, currency:string): string {
    let currencyMap = {
        "CAD": "en-CA",
        "USD": "en-US",
        "GBP": "en-GB"
    }

    let numberFormat= new Intl.NumberFormat(
        currencyMap[currency],
        {style: 'currency', 'currency': currency})

    return numberFormat.format(price)
}


module.exports = {searchTestDatabase, validateFormData, formatPrice}