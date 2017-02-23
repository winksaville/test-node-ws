console.log('ws_client:+');

/**
 * A WebSocket client
 */
export class WsClient {
  ws: WebSocket;

  public WsClient() {
  }

  public connect(urn: string) {
    console.log('connecting to server');

    if (this.ws === undefined) {
      this.ws = new WebSocket(`ws://${urn}`);
      console.log('create ws done');

      this.ws.onopen = function(evt: Event) {
        console.log('ws.onopen: connected evt=%s', JSON.stringify(evt));
      };

      this.ws.onclose = this.onclose(this);

      this.ws.onmessage = function (evt: Event) {
        console.log('ws.onmessage: evt=%s', JSON.stringify(evt));
      };

      this.ws.onerror = function(evt: Event) {
        console.log('ws.onerror: evt=%s', JSON.stringify(evt));
      };
    } else {
      throw 'ws is already connected or connecting, disconnect first';
    }
  }

  public disconnect() {
    console.log('disconnecting from server');
    try {
      if (this.ws) {
        this.ws.close();
      } else {
        console.log('ws is not defined');
      }
    } catch (err) {
      console.log('disconnecting err=%s', err);
    }
  }

  private onclose(wsClientThis: WsClient): {(evt: CloseEvent): void} {
    return (evt: CloseEvent) => {
      console.log('onclose: disconnected evt=%s', JSON.stringify(evt));
      wsClientThis.ws = undefined; // Error if strictNullChecks === true
    }
  }
}

console.log('ws_client:-');
