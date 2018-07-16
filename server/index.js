/* eslint no-process-exit:0 */

const Promise = require('bluebird');
global.Promise = Promise;

const express = require('express');
const next = require('next');
const F = require('lodash/fp');
const CoinMarketCap = require('./lib/coinmarketcap');

const port = process.env.PORT || 3000;
const isDev = process.env.NODE_ENV !== 'production';
const app = next({ dev: isDev });
const handle = app.getRequestHandler();

const slugifyTickerName = (name) => F.compose(
    F.join('-'),
    F.split(' '),
    F.toLower,
)(name);

function transformTicker (ticker) {
    if (F.isNil(ticker)) {
        return ticker;
    }
    return Object.assign({}, ticker, {
        slug: slugifyTickerName(ticker.name),
        volume_usd_24h: ticker['24h_volume_usd'],
    });
}

async function fetchTicker (slug) {
    const [res, history] = await Promise.all([
        CoinMarketCap.fetchTicker(slug),
        CoinMarketCap.fetchHistorical(slug),
    ]);
    const ticker = res[0];
    ticker.history = history;
    return transformTicker(ticker);
}

const tryCatchWrap = (func) => async (req, res, next) => {
    try {
        return await func(req, res, next);
    } catch (error) {
        console.error(error);
        return next(error);
    }
};

async function start () {
    await app.prepare();
    const server = express();

    server.use(express.static('assets'));

    server.get('/api/v1/market-cap', tryCatchWrap(async (req, res) => {
        const marketCap = await CoinMarketCap.fetchMarketCap();
        return res.jsonp({ marketCap });
    }));

    server.get('/api/v1/currencies', tryCatchWrap(async (req, res) => {
        const limit = F.getOr('100', ['query', 'limit'], req);
        const [ticker, marketCap] = await Promise.all([
            CoinMarketCap.fetchAllTickers(limit).then(tickers => tickers.map(transformTicker)),
            CoinMarketCap.fetchMarketCap(),
        ]);
        return res.jsonp({ marketCap, result: ticker });
    }));

    server.get('/api/v1/currencies/:slug', tryCatchWrap(async (req, res) => {
        const { slug } = req.params;
        const ticker = await fetchTicker(slug);
        return res.jsonp(transformTicker(ticker));
    }));

    server.get('/currencies/:slug', tryCatchWrap(async (req, res) => {
        const query = Object.assign({}, req.query, req.params);
        return app.render(req, res, '/currency', query);
    }));

    server.get('*', (req, res) => {
        return handle(req, res);
    });

    server.listen(port, (err) => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${port}`);
    });
}

module.exports = {
    start,
};
