const Promise = require('bluebird');
global.Promise = Promise;

const rp = require('request-promise');
const Server = require('../serve');

const resolveAPIPath = (p) => `http://localhost:3000/api/${p}`;

beforeAll(async () => {
    await Server.start();
});

test('GET v1/market-cap', async () => {
    const res = await rp({
        method: 'GET',
        url: resolveAPIPath('market-cap'),
        json: true,
    });
    expect(res.marketcap).toBeGreaterThanOrEqual(0);
});

test('GET v1/currencies', async () => {
    const res = await rp({
        method: 'GET',
        url: resolveAPIPath('currencies'),
        json: true,
    });
    expect(res.marketcap).toBeGreaterThanOrEqual(0);
    expect(res.result).not.toBeFalsy();
    expect(res.result.length).toBeGreaterThan(0);
});

test('GET v1/currencies/:slug', async () => {
    const slugs = [
        'bitcoin',
        'ethereum',
        'bitcoin-cash',
        'cardano',
        'basic-attention-token',
        '0x',
    ];

    Promise.each(slugs, async slug => {
        const res = await rp({
            method: 'GET',
            url: resolveAPIPath(`currencies/${slug}`),
            json: true,
        });
        expect(res).not.toBeFalsy();
        expect(Object.keys(res).length).toBeGreaterThan(1);
    });
});
