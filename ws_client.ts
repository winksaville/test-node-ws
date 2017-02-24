console.log('ws_client:+');

/**
 * A WebSocket client
 */
export class WsClient {
  ws?: WebSocket;

  public WsClient() {
  }

  public connect(urn: string) {
    console.log('connect:+ urn=%s this.ws=%s', urn, this.ws);

    if (this.ws === undefined) {
      console.log('create ws ws=%s', this.ws);
      this.ws = new WebSocket(`ws://${urn}`);
      console.log('create ws done ws=%s', this.ws);

      this.ws.onopen = function(evt: Event) {
        console.log('ws.onopen: connected evt=%s', JSON.stringify(evt));
      };

      this.ws.onclose = this.onclose(this);

      this.ws.onmessage = function (msg: MessageEvent) {
        console.log('ws.onmessage: msg.data=%s', msg.data);
      };

      this.ws.onerror = function(evt: Event) {
        console.log('ws.onerror: evt=%s', JSON.stringify(evt));
      };
    } else {
      throw 'ws is already connected or connecting, disconnect first';
    }
    console.log('connect:- urn=%s this.ws=%s', urn, this.ws);
  }

  public disconnect() {
    console.log('disconnect:+ this.ws=%s', this.ws);
    try {
      if (this.ws) {
        console.log('disconnect: disconnecting from server');
        this.ws.close();
      } else {
        console.log('disconnect: ws is not defined');
      }
    } catch (err) {
      console.log('disconnect: err=%s', err);
    }
    console.log('disconnect:- this.ws=%s', this.ws);
  }

  public sendMsg(msg: string) {
    console.log('sendMsg:+ this.ws=%s msg=%s', this.ws, msg);
    if (this.ws) {
      console.log('sendMsg: sending');
      this.ws.send(msg);
      console.log('sendMsg: sent');
    }
    console.log('sendMsg:- this.ws=%s msg=%s', this.ws, msg);
  }

  private onclose(wsClientThis: WsClient): {(evt: CloseEvent): void} {
    return (evt: CloseEvent) => {
      console.log('onclose: disconnected evt=%s', JSON.stringify(evt));
      wsClientThis.ws = undefined;
    }
  }
}

console.log('ws_client:-');
