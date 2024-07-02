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

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs"
import { resolve } from "path"
import * as cheerio from 'cheerio';

const CACHE_PATH = 'data/.cache/'

interface Car {
    make: string
    model: string
    year: number
    price: number
    mileage: number
    drivetrain: string
    transmission: string
}


/**
 * Searches through Kijiji autos and filters based on form data
 * 
 * @param formData 
 * @returns 
 */
export async function searchKijiji(formData: object): Promise<Car[]> {
    // Validate form data
    let formDataError = validateFormData(formData)
    if (formDataError) {
        console.error(formDataError)
        return []
    }

    // Determine if an operator is present in our form data
    let operator = formData["year"][0]
    if (operator in ["+", "-", "!", "<", ">", "=", "~"] && Number(formData["year"].substring(1))) {

        let year = formData["year"].substring(1)

        // If operator is present, parse minYear and/or maxYear around it
        switch (operator) {
            case "+":   // treated as >=
                formData["minYear"] = year
                break

            case ">":
                let minYear = Number(year) + 1
                formData["minYear"] = minYear.toString()
                break

            case "-":   // treated as <=
                formData["maxYear"] = year
                break

            case "<":
                let maxYear = Number(year) - 1
                formData["maxYear"] = maxYear.toString()
                break

            case "=":
                formData["minYear"] = year
                formData["maxYear"] = year
                break

            case "!":
                formData["removeYear"] = year
                break
            
            case "~":   // treated as "approximately"
                let approxMinYear = Number(year) - 3
                let approxMaxYear = Number(year) + 3
                formData["minYear"] = approxMinYear.toString()
                formData["maxYear"] = approxMaxYear.toString()
                break
        }

    // If no operator is present, use default equality operator
    } else if (Number(formData["year"])) {
        formData["minYear"] = formData["year"]
        formData["maxYear"] = formData["year"]
    } else {
        console.error("received non-numeric year value")
        delete formData["year"]
    }
    
    // Get page data from Kijiji
    let pageData = await fetchPageData(formData)
    console.log("pageData:", pageData)

    // Parse page data into an array of car records
    let cars = parsePageData(pageData)
    console.log("cars:", cars)

    return cars
}


/**
 * Fetches car listings from Kijiji based on form data
 * 
 * @param formData 
 * @returns 
 */
async function fetchPageData(filters: object): Promise<string|void> {
     /**
     * BASE URL
     *  https://www.kijijiautos.ca/cars
     * 
     * PATH
     *  /{make}/{model}/{transmission}
     * 
     * PARAMS /#...&...&...&...
     *  dt={drivetrain}
     *  p={minPrice}:{maxprice}
     *  yc={minYear}:{maxYear}
     *  ml={minKm}:{maxKm}
     *  q={keywords}
     */
    let drivetrain = filters["drivetrain"] ? `dt=${filters["drivetrain"]}` : ""
    let price = filters["price"] ? `p=:${filters["price"]}` : ""
    let year = filters["year"] ? `yc=${filters["minYear"]}:${filters["maxYear"]}` : ""
    let mileage = filters["mileage"] ? `ml=:${filters["mileage"]}` : ""
    let keywords = filters["keywords"] ? `q=${filters["keywords"]}` : ""

    let baseURL = "https://www.kijijiautos.ca/cars"
    let path = `/${filters["make"]}/${filters["model"]}/${filters["transmission"]}`
    let params = "/#"

    // using a for loop to avoid unnecessary "&" in between filters that equal ""
    for (let filter of [drivetrain, price, year, mileage, keywords]) {
        if (filter) {
            params += filter + "&"
        }
    }

    // removing trailing '&' if it exists (not necessary, but cleaner URL for cacheing)
    params = params.replace(/\&$/, '');
    let scrapeURL = encodeURI(baseURL + path + params)

    // create cache folder if it doesn't exist
    if (!existsSync(resolve(__dirname, CACHE_PATH))) {
        mkdirSync(CACHE_PATH);
      }
    
    // check if page is already cached, if so use it instead of fetching
    if (existsSync(CACHE_PATH + scrapeURL + ".html")) {
        const pageData = readFileSync(CACHE_PATH + scrapeURL + ".html", 'utf8')
        return new Promise((resolve) => {resolve(pageData)})

    // if not, fetch it and cache it
    } else {
        // fetch page
        const options = {
            method: "GET",
            headers: {
                "Accept": "text/html",
                "Content-Type": "text/html"
            }
        }

    fetch(scrapeURL, options)
        .then((response) => response.text())
        .then((pageData) => {writeFileSync(scrapeURL + ".html", pageData)})
        .then((pageData) => {return pageData})
        .catch(error => console.error("Error fetching page data:", error))
    }
}


/**
 * Parses HTML page data into an array of car records
 * 
 * @param pageData
 * @returns 
 */
function parsePageData(pageData: string|void): Car[]{
    if (!pageData) {
        return []
    }

    const cars: Car[] = []
    const $ = cheerio.load(pageData)
    
    $(".class").each((i, elem) => {
        let car: Car = {
            make: $(elem).find("make").text(),
            model: $(elem).find("model").text(),
            year: Number($(elem).find("year").text()),
            price: Number($(elem).find("price").text()),
            mileage: Number($(elem).find("mileage").text()),
            drivetrain: $(elem).find("drivetrain").text(),
            transmission: $(elem).find("transmission").text(),
        }
        cars.push(car)
    })

    return cars
}

/**
* Validates form data to prevent SQL injection and XSS attacks
* Some validation is done in the query library, but this is an extra layer of security
* @param    {req.body}  formData    form data from POST request
* @returns  {Error/null}            error if invalid data, null otherwise
*/
export function validateFormData(formData: object): Error | undefined {    
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
export function formatPrice(price: number, currency: string): string {
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


module.exports = {searchKijiji}