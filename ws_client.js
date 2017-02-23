"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
console.log('ws_client:+');
/**
 * A WebSocket client
 */
class WsClient {
    WsClient() {
    }
    connect(urn) {
        console.log('connect:+ urn=%s this.ws=%s', urn, this.ws);
        if (this.ws === undefined) {
            console.log('create ws ws=%s', this.ws);
            this.ws = new WebSocket(`ws://${urn}`);
            console.log('create ws done ws=%s', this.ws);
            this.ws.onopen = function (evt) {
                console.log('ws.onopen: connected evt=%s', JSON.stringify(evt));
            };
            this.ws.onclose = this.onclose(this);
            this.ws.onmessage = function (evt) {
                console.log('ws.onmessage: evt=%s', JSON.stringify(evt));
            };
            this.ws.onerror = function (evt) {
                console.log('ws.onerror: evt=%s', JSON.stringify(evt));
            };
        }
        else {
            throw 'ws is already connected or connecting, disconnect first';
        }
        console.log('connect:- urn=%s this.ws=%s', urn, this.ws);
    }
    disconnect() {
        console.log('disconnect:+ this.ws=%s', this.ws);
        try {
            if (this.ws) {
                console.log('disconnect: disconnecting from server');
                this.ws.close();
            }
            else {
                console.log('disconnect: ws is not defined');
            }
        }
        catch (err) {
            console.log('disconnect: err=%s', err);
        }
        console.log('disconnect:- this.ws=%s', this.ws);
    }
    onclose(wsClientThis) {
        return (evt) => {
            console.log('onclose: disconnected evt=%s', JSON.stringify(evt));
            wsClientThis.ws = undefined;
        };
    }
}
exports.WsClient = WsClient;
console.log('ws_client:-');
//# sourceMappingURL=ws_client.js.map