/**
 * Author: Tem Tamre
 * Contact: temtamre@gmail.com
 */


/**
 * Get a properly formatted price tag given a price and currency
 * @param {number} price    given price
 * @param {string} currency currency of the given price
 */
export function formatPrice(price, currency) {
    let currencyMap = {
        "CAD": "en-CA",
        "USD": "en-US",
        "GBP": "en-GB"
    };

    let numberFormat = new Intl.NumberFormat(
        currencyMap[currency],
        {style: 'currency', 'currency': currency});

    return numberFormat.format(`$${price}`);
}

// string validation

// string formatting