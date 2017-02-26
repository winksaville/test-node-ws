"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// To enable in the browser use the browser console to set
// localStorage.debug='my-wsclient'
const debug = require('debug')('my-ws_client');
debug('ws_client:+');
/**
 * A WebSocket client
 */
class WsClient {
    WsClient() {
    }
    connect(urn) {
        debug('connect:+ urn=%s this.ws=%s', urn, this.ws);
        if (this.ws === undefined) {
            debug('create ws ws=%s', this.ws);
            this.ws = new WebSocket(`ws://${urn}`);
            debug('create ws done ws=%s', this.ws);
            this.ws.onopen = function (evt) {
                debug('ws.onopen: connected evt=%s', JSON.stringify(evt));
            };
            this.ws.onclose = this.onclose(this);
            this.ws.onmessage = function (msg) {
                debug('ws.onmessage: msg.data=%s', msg.data);
            };
            this.ws.onerror = function (evt) {
                debug('ws.onerror: evt=%s', JSON.stringify(evt));
            };
        }
        else {
            throw 'ws is already connected or connecting, disconnect first';
        }
        debug('connect:- urn=%s this.ws=%s', urn, this.ws);
    }
    disconnect() {
        debug('disconnect:+ this.ws=%s', this.ws);
        try {
            if (this.ws) {
                debug('disconnect: disconnecting from server');
                this.ws.close();
            }
            else {
                debug('disconnect: ws is not defined');
            }
        }
        catch (err) {
            debug('disconnect: err=%s', err);
        }
        debug('disconnect:- this.ws=%s', this.ws);
    }
    sendMsg(msg) {
        debug('sendMsg:+ this.ws=%s msg=%s', this.ws, msg);
        if (this.ws) {
            debug('sendMsg: sending');
            this.ws.send(msg);
            debug('sendMsg: sent');
        }
        debug('sendMsg:- this.ws=%s msg=%s', this.ws, msg);
    }
    onclose(wsClientThis) {
        return (evt) => {
            debug('onclose: disconnected evt=%s', JSON.stringify(evt));
            wsClientThis.ws = undefined;
        };
    }
}
exports.WsClient = WsClient;
debug('ws_client:-');
//# sourceMappingURL=ws_client.js.map