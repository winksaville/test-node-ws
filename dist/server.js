"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const fs = require("fs");
const WebSocket = require("ws");
const lib_1 = require("./lib");
// See [issue #5](https://github.com/winksaville/test-node-ws/issues/5)
//import debug = require('debug');
//import * as debug from 'debug';
//import { debug } from 'debug';
const debug = require('debug')('my-server');
const PORT = 3000;
// Create a server and the handler for a few requests
const http_server = http.createServer((req, res) => {
    debug('req.url=%s res=%s', req.url, res);
    switch (req.url) {
        case '/': {
            res.writeHead(200, {
                'content-type': 'text/html',
                'charset': 'UTF-8'
            });
            fs.createReadStream('./public/index.html').pipe(res);
            break;
        }
        case '/dist/bundle.js': {
            res.writeHead(200, {
                'content-type': 'text/javascript',
                'charset': 'UTF-8'
            });
            fs.createReadStream('./dist/bundle.js').pipe(res);
            break;
        }
        default: {
            debug('default: req.url=' + req.url);
            res.writeHead(404, {
                'content-type': 'text/html',
                'charset': 'UTF-8'
            });
            res.end('bad req.url=' + req.url);
            break;
        }
    }
});
// Start it listening on the desired port
http_server.listen(PORT, () => {
    debug('Listening on: http://localhost:%s', PORT);
});
var conn_id = 0;
class Connection {
    constructor() {
        this.id = conn_id++;
    }
    toString() {
        return `Connection: id=${this.id} delay=${this.delay} spacing=${this.spacing} timeout=${this.timeout}`;
    }
}
// Create WebSocket Server and handle some events
let ws_server = new WebSocket.Server({ server: http_server });
ws_server.on('connection', (client) => {
    let conn = new Connection();
    conn.client = client;
    debug('onConnect: conn=%s', conn.toString());
    startEventGenerator(conn, lib_1.secs2ms(10), lib_1.secs2ms(3));
    client.on('close', (code, reason) => {
        debug('client: closed code=%d reason=\'%s\' conn=%s', code, reason, conn.toString());
        stopEventGenerator(conn);
    });
    client.on('message', (msg, flags) => {
        debug('client: message msg=%s flags=%s', msg, JSON.stringify(flags));
    });
});
ws_server.on('error', (err) => {
    debug('ws_server: error err=%s', err);
});
ws_server.on('headers', (headers) => {
    debug('ws_server: headers=%s', JSON.stringify(headers));
});
ws_server.on('listening', () => {
    debug('ws_server: listening');
});
function startEventGenerator(conn, delay, spacing) {
    debug('startEventGenerator:+ delay=%d spacing=%d conn=%s', delay, spacing, conn.toString());
    conn.delay = delay;
    conn.spacing = spacing;
    conn.timeout = 0;
    conn.timeoutObj = setTimeout(() => {
        timeout(conn, 'initial');
    }, conn.delay);
    debug('startEventGenerator:- delay=%d spacing=%d conn=%s', delay, spacing, conn.toString());
}
function stopEventGenerator(conn) {
    debug('stopEventGenerator:+ conn=%s', conn.toString());
    if (conn.timeoutObj) {
        clearTimeout(conn.timeoutObj);
        conn.timeoutObj = null;
    }
    debug('stopEventGenerator:- conn=%s', conn.toString());
}
function timeout(conn, str) {
    if (conn.timeoutObj) {
        conn.client.send(`hi client ${conn.timeout}`);
        conn.timeout += 1;
        debug('timeout: str=%s conn=%s', str, conn.toString());
        setTimeout(() => {
            timeout(conn, 'continuing');
        }, conn.spacing);
    }
    else {
        debug('timeout: stopped');
    }
}
//# sourceMappingURL=server.js.map