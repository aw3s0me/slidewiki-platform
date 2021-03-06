/**
 * This leverages Express to create and run the http server.
 * A Fluxible context is created and executes the navigateAction
 * based on the URL. Once completed, the store state is dehydrated
 * and the application is rendered via React.
 */
import express from 'express';
import favicon from 'serve-favicon';
import serialize from 'serialize-javascript';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import csrf from 'csurf';
import compression from 'compression';
import debugLib from 'debug';
import path from 'path';
import {navigateAction} from 'fluxible-router';
import React from 'react';
import ReactDOM from 'react-dom/server';
import app from './app';
import HTMLComponent from './components/DefaultHTMLLayout';
import { createElementWithContext } from 'fluxible-addons-react';
import cookie from 'react-cookie';

const uuidV4 = require('uuid/v4');
const log = require('./configs/log').log;

const env = process.env.NODE_ENV;
// So we can check whether we are in the browser or not.  Required for webpack-load-css
//otherwise it will try and transpile CSS into JavaScript.
process.env.BROWSER = false;

const debug = debugLib('slidewiki-platform');

const host = process.env.HOST ? process.env.HOST : '0.0.0.0';
let port = 3000 ;
if(env === 'production'){
    port = process.env.PORT ? process.env.PORT :  3000;
}else{
    port = process.env.PORT ? parseInt(process.env.PORT) + 1 : 3001;
}

const server = express();
server.use(cookieParser());
server.use(bodyParser.json({limit: '50mb'}));
server.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
server.use(compression());
server.use(favicon(path.join(__dirname, '/favicon.ico')));
server.use('/public', express.static (path.join(__dirname, '/build')));
server.use('/custom_modules', express.static (path.join(__dirname, '/custom_modules')));
server.use('/assets', express.static (path.join(__dirname, '/assets')));
//server.use('/bower_components', express.static (path.join(__dirname, '/bower_components')));
//add external dependencies to be loaded on frontend here:
server.use('/json3', express.static(path.join(__dirname, '/node_modules/json3')));
server.use('/es5-shim', express.static(path.join(__dirname, '/node_modules/es5-shim')));
server.use('/es6-shim', express.static(path.join(__dirname, '/node_modules/es6-shim')));
server.use('/jquery', express.static(path.join(__dirname, '/node_modules/jquery')));
server.use('/sweetalert2', express.static(path.join(__dirname, '/node_modules/sweetalert2')));
server.use('/headjs', express.static(path.join(__dirname, '/node_modules/headjs')));

server.use('/ckeditor', express.static(path.join(__dirname, 'node_modules/ckeditor')));
server.use('/ckeditor-plugins/youtube', express.static(path.join(__dirname, 'node_modules/ckeditor-youtube-plugin/youtube')));
server.use('/ckeditor-plugins/lineheight', express.static(path.join(__dirname, 'node_modules/ckeditor-lineheight-plugin')));
server.use('/mathjax', express.static(path.join(__dirname, 'node_modules/mathjax')));

//server.use(csrf({cookie: true}));
// Get access to the fetchr plugin instance
let fetchrPlugin = app.getPlugin('FetchrPlugin');

// Set up the fetchr middleware
server.use(fetchrPlugin.getXhrPath(), fetchrPlugin.getMiddleware());

// Register our services
fetchrPlugin.registerService(require('./services/contributors'));
fetchrPlugin.registerService(require('./services/deck'));
fetchrPlugin.registerService(require('./services/slide'));
fetchrPlugin.registerService(require('./services/datasource'));
fetchrPlugin.registerService(require('./services/activities'));
fetchrPlugin.registerService(require('./services/decktree'));
fetchrPlugin.registerService(require('./services/translation'));
fetchrPlugin.registerService(require('./services/history'));
fetchrPlugin.registerService(require('./services/usage'));
fetchrPlugin.registerService(require('./services/questions'));
fetchrPlugin.registerService(require('./services/discussion'));
fetchrPlugin.registerService(require('./services/similarcontent'));
fetchrPlugin.registerService(require('./services/import'));
fetchrPlugin.registerService(require('./services/presentation'));
fetchrPlugin.registerService(require('./services/notifications'));
fetchrPlugin.registerService(require('./services/user'));
fetchrPlugin.registerService(require('./services/searchresults'));
fetchrPlugin.registerService(require('./services/userProfile'));
fetchrPlugin.registerService(require('./services/suggester'));
fetchrPlugin.registerService(require('./services/logservice'));

server.use((req, res, next) => {
    req.reqId = uuidV4().replace(/-/g, '');
    res.reqId = req.reqId.replace(/-/g, '');
    const context =  app.createContext({
        req: req,
        res: res  //for userStoragePlugin
        //, // The fetchr plugin depends on this
        //xhrContext: {
        //    _csrf: req.csrfToken() // Make sure all XHR requests have the CSRF token
        //}
    });

    log.info({Id: req.reqId, Method: req.method, URL: req.url, IP: req.ip, Message: 'New request'});
    cookie.plugToRequest(req,res);
    debug('Executing navigate action');
    context.getActionContext().executeAction(navigateAction, {url: req.url, reqId: req.reqId}, (err) => {
        if (err) {
            if (err.statusCode && err.statusCode === 404) {
                // TODO refector the code in this if-else block
                const exposed = 'window.App=' + serialize(app.dehydrate(context)) + ';';
                debug('Rendering Application component into html');
                const markup = ReactDOM.renderToString(createElementWithContext(context));
                //todo: for future, we can choose to not include specific scripts in some predefined layouts
                const htmlElement = React.createElement(HTMLComponent, {
                    clientFile: 'main.js',
                    addAssets: (env === 'production'),
                    context: context.getComponentContext(),
                    state: exposed,
                    markup: markup
                });
                const html = ReactDOM.renderToStaticMarkup(htmlElement);
                debug('Sending markup');
                res.type('html');
                res.status(err.statusCode);
                res.write('<!DOCTYPE html>' + html);
                log.error({Id: res.reqId, URL: req.url, StatusCode: res.statusCode, StatusMessage: res.statusMessage, Message: 'Sending response'});
                res.end();
                // Pass through to next middleware
                //next();
            } else {
                const exposed = 'window.App=' + serialize(app.dehydrate(context)) + ';';
                debug('Rendering Application component into html');
                const markup = ReactDOM.renderToString(createElementWithContext(context));
                //todo: for future, we can choose to not include specific scripts in some predefined layouts
                const htmlElement = React.createElement(HTMLComponent, {
                    clientFile: 'main.js',
                    addAssets: (env === 'production'),
                    context: context.getComponentContext(),
                    state: exposed,
                    markup: markup
                });
                const html = ReactDOM.renderToStaticMarkup(htmlElement);
                debug('Sending markup');
                res.type('html');
                res.status(err.statusCode);
                res.write('<!DOCTYPE html>' + html);
                log.error({Id: res.reqId, StatusCode: res.statusCode, StatusMessage: res.statusMessage, Message: 'Sending response'});
                res.end();
                //next(err);
            }
            return;
        }

        debug('Exposing context state');
        const exposed = 'window.App=' + serialize(app.dehydrate(context)) + ';';

        debug('Rendering Application component into html');
        const markup = ReactDOM.renderToString(createElementWithContext(context));
        //todo: for future, we can choose to not include specific scripts in some predefined layouts
        const htmlElement = React.createElement(HTMLComponent, {
            //clientFile: env === 'production' ? 'main.min.js' : 'main.js',
            clientFile: 'main.js',
            addAssets: (env === 'production'),
            context: context.getComponentContext(),
            state: exposed,
            markup: markup
        });
        const html = ReactDOM.renderToStaticMarkup(htmlElement);

        debug('Sending markup');
        res.type('html');
        res.write('<!DOCTYPE html>' + html);
        //console.log(Object.keys(res), res.statusCode, res.statusMessage, Object.keys(res.req));
        log.info({Id: res.reqId, StatusCode: res.statusCode, StatusMessage: res.statusMessage, Message: 'sending response'});
        res.end();
    });
});


server.listen(port);
if(env === 'production'){
    console.log('[production environment] Check your application on http://%s:%s', host, port);
}else{
    console.log('[development environment] Proxy server listening on port ' + port);
    console.log('[development environment] Check your application on http://%s:%s', host, port-1);
}

export default server;
