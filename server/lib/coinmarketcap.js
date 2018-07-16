const rp = require('request-promise');
const memoize = require('memoizee');
const { scrapeHistory, scrapeMarketCap } = require('./scrape-coinmarketcap');

const cacheFunc = (func) => memoize(func, { maxAge: 1000 * 60 * 5 });

const fetchAllTickers = (limit) => rp({ url: 'https://api.coinmarketcap.com/v1/ticker', json: true, qs: { limit } });
const fetchTicker = (name) => rp({ url: `https://api.coinmarketcap.com/v1/ticker/${name}`, json: true });

module.exports = {
    fetchAllTickers: cacheFunc(fetchAllTickers),
    fetchTicker: cacheFunc(fetchTicker),
    fetchHistorical: cacheFunc(scrapeHistory),
    fetchMarketCap: cacheFunc(scrapeMarketCap),
};
