const cheerio = require('cheerio');
const rp = require('request-promise');
const F = require('lodash/fp');

const transformCommaStringToInt = F.compose(
    x => parseInt(x, 10),
    F.join(''),
    F.split(','),
    x => x || ''
);

function pad (integer, width, z = '0') {
    const n = integer + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function dateToCMCString (date) {
    return `${date.getFullYear()}${pad(date.getMonth() + 1, 2)}${pad(date.getDate(), 2)}`;
}

async function fetchHistoricalData ({ coinName, endDate, startDate }) {
    const start = startDate ? dateToCMCString(startDate) : `20130428`;
    const end = dateToCMCString(endDate || new Date());
    return rp({
        url: `https://coinmarketcap.com/currencies/${coinName}/historical-data/?start=${start}&end=${end}`,
        method: 'GET',
        json: false,
    });
}

const transformScrapedRow = (row = []) => ({
    time: new Date(row[0]).getTime(),
    open: parseFloat(row[1]),
    high: parseFloat(row[2]),
    low: parseFloat(row[3]),
    close: parseFloat(row[4]),
    volume: transformCommaStringToInt(row[5]),
    marketcap: transformCommaStringToInt(row[6]),
});

async function scrapeHistory (coinName) {
    const res = await fetchHistoricalData({ coinName });
    const $ = cheerio.load(res);
    let data = [];
    $('#historical-data table tbody tr td').each((i, elem) => {
        const str = elem.children.map(x => x.data).join(' - ');
        const index = Math.floor(i / 7);
        let inner = data[index] || [];
        inner.push(str);
        data[index] = inner;
    });
    return data.map(transformScrapedRow);
}

async function scrapeMarketCap () {
    const res = await rp(`https://coinmarketcap.com/`);
    const marketcap = F.compose(
        transformCommaStringToInt,
        F.head,
        F.filter(x => x.length > 0),
        F.split('$'),
        F.trim
    )(cheerio('#total-marketcap', res).text());
    return marketcap;
}

module.exports = {
    scrapeHistory,
    scrapeMarketCap,
};
