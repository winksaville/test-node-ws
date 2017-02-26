// To enable in the browser use the browser console to set
// localStorage.debug='my-wsclient'
const debug = require('debug')('my-ws_client');

debug('ws_client:+');

/**
 * A WebSocket client
 */
export class WsClient {
  ws?: WebSocket;

  public WsClient() {
  }

  public connect(urn: string) {
    debug('connect:+ urn=%s this.ws=%s', urn, this.ws);

    if (this.ws === undefined) {
      debug('create ws ws=%s', this.ws);
      this.ws = new WebSocket(`ws://${urn}`);
      debug('create ws done ws=%s', this.ws);

      this.ws.onopen = function(evt: Event) {
        debug('ws.onopen: connected evt=%s', JSON.stringify(evt));
      };

      this.ws.onclose = this.onclose(this);

      this.ws.onmessage = function (msg: MessageEvent) {
        debug('ws.onmessage: msg.data=%s', msg.data);
      };

      this.ws.onerror = function(evt: Event) {
        debug('ws.onerror: evt=%s', JSON.stringify(evt));
      };
    } else {
      throw 'ws is already connected or connecting, disconnect first';
    }
    debug('connect:- urn=%s this.ws=%s', urn, this.ws);
  }

  public disconnect() {
    debug('disconnect:+ this.ws=%s', this.ws);
    try {
      if (this.ws) {
        debug('disconnect: disconnecting from server');
        this.ws.close();
      } else {
        debug('disconnect: ws is not defined');
      }
    } catch (err) {
      debug('disconnect: err=%s', err);
    }
    debug('disconnect:- this.ws=%s', this.ws);
  }

  public sendMsg(msg: string) {
    debug('sendMsg:+ this.ws=%s msg=%s', this.ws, msg);
    if (this.ws) {
      debug('sendMsg: sending');
      this.ws.send(msg);
      debug('sendMsg: sent');
    }
    debug('sendMsg:- this.ws=%s msg=%s', this.ws, msg);
  }

  private onclose(wsClientThis: WsClient): {(evt: CloseEvent): void} {
    return (evt: CloseEvent) => {
      debug('onclose: disconnected evt=%s', JSON.stringify(evt));
      wsClientThis.ws = undefined;
    }
  }
}

debug('ws_client:-');
