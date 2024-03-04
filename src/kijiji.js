/**
 * Kijiji API service
 * 
 * Author: Tem Tamre
 * Contact: temtamre@gmail.com
 * 
 * https://www.npmjs.com/package/kijiji-scraper
 */

const kijiji = require('kijiji-scraper');
const fs = require('fs');

module.exports = {
    searchKijiji: function(formData) {
        const params = {
            locationID: kijiji.locations.ALBERTA.EDMONTON_AREA,
            categoryID: kijiji.categories.CARS_AND_VEHICLES.CARS_AND_TRUCKS,
            keywords: `${formData["year"]} ${formData["make"]} ${formData["model"]}`.trim(),
            minPrice: 0,
            maxPrice: formData["price"].trim() == '' ? 0 : parseInt(formData["price"]),
            sortByName: "priceAsc"
        }

        const options = {
            minResults: 40,
            maxResults: 120,
            scrapeResultDetails: false
        }
        
        kijiji.search(params, options).then(ads => {
            // for debugging - remove and delete data directory when solved
            fs.writeFile(
                `data/${new Date().toLocaleString().replaceAll('/', '.').replaceAll(',', '')}.json`,
                JSON.stringify(ads, null, '\t'),
                (err) => {console.error(err)});

            console.log(params);
            return ads
            
        }).catch(console.error);
    },

    searchTestData: function(formData) {
        let data = require('./test_data.json');
        let filteredData = data;

        if (formData["year"]) {
            let operator = null;
            if (isNaN(formData["year"][0])) {
                operator = formData["year"][0];
                formData["year"] = +(formData["year"].substring(1))
            }

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
        
        return filteredData;
    }
}