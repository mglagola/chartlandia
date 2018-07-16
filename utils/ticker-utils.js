const F = require('lodash/fp');

export const tickerIndication = (change) => F.head(`${change}`) === '-'
    ? 'dec'
    : 'inc';

export const formatNumber = (number, digits = 2) => (
    parseFloat(number).toLocaleString('en-US', { minimumFractionDigits: digits })
);
