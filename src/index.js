import 'dotenv/config';
import config from './config/index.js';
import appManager from './app';
import path from 'path';
import Logger from './utils/winston-logger';
const https = require('https');
const http = require('http');
const fs = require('fs');

global.appRoot = path.resolve(__dirname);
const PORT = config.app.port;
const app = appManager.setup(config);

/* Start Listening service */
const httpServer = http.createServer(app);
if (process.env.APP_LOG === 'production') {
    productionDetails()
} else {
    httpServer.listen(PORT, () => {
        Logger.info(`Local Server is running at PORT http://localhost:${PORT}`);
    });

}

function productionDetails() {
    const httpsServer = https.createServer({
        key: fs.readFileSync(process.env.SSL_KEY_PATH),
        cert: fs.readFileSync(process.env.SSL_CERT_PATH),
        ca: [fs.readFileSync(process.env.SSL_CA_PATH)]
    }, app);
    httpsServer.listen(PORT, () => {
        Logger.info(`${
            process.env.SERVER_RUN_MSG
        }${PORT}`);
    });
}
