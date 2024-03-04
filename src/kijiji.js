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
    searchCars: function(formData) {
        const params = {
            locationID: kijiji.locations.ALBERTA.EDMONTON_AREA,
            categoryID: kijiji.categories.CARS_AND_VEHICLES.CARS_AND_TRUCKS,
            keywords: `${formData["formYear"]} ${formData["formMake"]} ${formData["formModel"]}`.trim(),
            minPrice: 0,
            maxPrice: formData["formPrice"].trim() == '' ? 0 : parseInt(formData["formPrice"]),
            sortByName: "priceAsc"
        }

        const options = {
            minResults: 40,
            maxResults: 120,
            scrapeResultDetails: false
        }
        
        kijiji.search(params, options).then(ads => {
            // TODO figure out why non-cars are not being filtered out
            let data = [];

            for (let i = 0; i < ads.length; ++i) {
                console.log(`${ads[i].title}\n${ads[i]['url']}\n`)
                data.push(ads[i])
            }

            // for debugging - remove and delete data directory when solved
            fs.writeFile(
                `data/${new Date().toLocaleString().replaceAll('/', '.').replaceAll(',', '')}.json`,
                JSON.stringify(ads, null, '\t'),
                (err) => {console.error(err)});

            console.log(params);
            
        }).catch(console.error);
    },

    createTable: function(data) {}
}