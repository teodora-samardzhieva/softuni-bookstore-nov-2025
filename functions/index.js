const { setGlobalOptions } = require("firebase-functions/v2");
const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

setGlobalOptions({ maxInstances: 1, region: 'europe-west4' });

const server = require('./server/server.js');

exports.server = onRequest((req, res) => {
    res.set("Access-Control-Allow-Origin", "http://localhost:5173");
    server.emit('request', req, res);
});

