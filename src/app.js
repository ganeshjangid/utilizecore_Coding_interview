import express from 'express';
import morgon from 'morgan';
import path from 'path';
import session from 'express-session';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import expressSanitizer from 'express-sanitizer';
import helmet from 'helmet';
import fs from 'fs';
import cors from 'cors';
import {restRouter} from './api';
import oneApiSwagger from '../one-api-swagger';
import {db} from './models';
import Logger from './utils/winston-logger';

export default {
    setup: (config) => {
        const app = express();

        const accessLogStream = fs.createWriteStream(path.join(__dirname, '../log/access.log'), {flags: 'a'});
        if (process.env.APP_LOG === "test") {
            app.use(morgon('test'));
        } else {
            app.use(morgon('combined', {stream: accessLogStream}));
        }


        /*cors handling*/
        app.use(cors(config.app.cors_origin));
        app.use(bodyParser.urlencoded({extended: false}));
        app.use(bodyParser.json({limit: '50mb'}));

        app.use(cookieParser(config.app.secret));
        app.use(session({secret: config.app.secret, resave: true, saveUninitialized: true}));
        app.use(expressSanitizer());
        app.use(helmet());
        app.use(helmet.hsts({maxAge: 31536000, includeSubDomains: true}))

        /* Route handling */
        app.use('/api', restRouter);

        /* Swagger or OneAPI Document */
        app.use('/api-docs', oneApiSwagger);

        /* Database Connection */
        db.sequelize.authenticate().then(function () {
            Logger.info('Nice! Database looks fine');
        }).catch(function (err) {
            Logger.error("Something went wrong with the Database Update!=>" + err);
        });
        // db.sequelize.sync({force: true});
        // db.sequelize.sync();

        Number.prototype.pad = function (size) {
            var s = String(this);
            while (s.length<(size || 2)) {
                s = "0" + s;
            }
            return s;
        }

        app.use((req, res, next) => {
                const err = new Error('Invalid route');
                err['status'] = 404;
                Logger.error(err);
                next(err);
            }) 
                app.use((err, req, res, next) => {
                    if (err.name === 'UnauthorizedError') {
                        return res.status(err.status).send({message: err.message}).end();
                    }
                    return next(err);
                });
            


            app.use((err, req, res, next) => {
                Logger.error(err);
                res.status(err.status || 500);
                res.json({
                    errors: {
                        message: err.message
                    }
                });
            });
            return app;
        }
    }
