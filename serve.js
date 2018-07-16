/* eslint no-process-exit:0 */

const { start } = require('./server');

(async function () {
    try {
        await start();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
})();
