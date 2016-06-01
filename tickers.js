var robinhood = require( 'robinhood' );

var tickers = function() {}

tickers.prototype.get_current_price = function(ticker) {
    robinhood(null).quote_data( ticker, function(error, response, body) {
        if (error) {
            console.error(error);
            process.exit(1);
        }

        console.log(body.results[0].ask_price);
    });
}

module.exports = new tickers();
