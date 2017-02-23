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
        console.log('connecting to server');
        if (this.ws === undefined) {
            this.ws = new WebSocket(`ws://${urn}`);
            console.log('create ws done');
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
    }
    disconnect() {
        console.log('disconnecting from server');
        try {
            if (this.ws) {
                this.ws.close();
            }
            else {
                console.log('ws is not defined');
            }
        }
        catch (err) {
            console.log('disconnecting err=%s', err);
        }
    }
    onclose(wsClientThis) {
        return (evt) => {
            console.log('onclose: disconnected evt=%s', JSON.stringify(evt));
            wsClientThis.ws = undefined; // Error if strictNullChecks === true
        };
    }
}
exports.WsClient = WsClient;
console.log('ws_client:-');
//# sourceMappingURL=ws_client.js.map