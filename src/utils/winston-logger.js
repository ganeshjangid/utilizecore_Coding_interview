import path from 'path';
const {createLogger, format, transports} = require('winston');
const {
    combine,
    splat,
    json,
    printf,
    align
} = format;
const fs = require('fs');
const DailyRotate = require('winston-daily-rotate-file');

const logDir = path.join(__dirname, '..', '..', 'log');

const myFormat = printf(({
    level,
    timestamp,
    message,
    ...metadata
}) => {
    let msg = `${timestamp} [${level}] : ${message}:`;
    if (metadata) {
        msg += JSON.stringify(metadata);
    }
    return msg;
});

const logger = createLogger({
    level: 'info',
    format: combine(splat(), align(), json(), format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}), myFormat),
    transports: [
        new transports.Console(), new DailyRotate(
            {filename: `${logDir}/%DATE%-logging.log`, datePattern: 'YYYY-MM-DD', json: true}
        ),
    ],
    exitOnError: false
});

export default logger;
