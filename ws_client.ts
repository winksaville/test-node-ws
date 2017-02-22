console.log('ws_client:+');

// How to make this a property of the ws_client object below
let ws: WebSocket;

export let ws_client = {
  connect: function () {
    console.log('connecting to server');

    //let ws = new WebSocketClient('ws://localhost:3000');
    ws = new WebSocket('ws://localhost:3000');
    console.log('create ws done');

    ws.onopen = function(evt) {
      console.log('ws.onopen: connected evt=%s', JSON.stringify(evt));
    };

    ws.onclose = function(evt) {
      console.log('ws.onclose: disconnected evt=%s', JSON.stringify(evt));
    };

    ws.onmessage = function (evt) {
      console.log('ws.onmessage: evt=%s', JSON.stringify(evt));
    };

    ws.onerror = function(evt) {
      console.log('ws.onerror: evt=%s', JSON.stringify(evt));
    };
  },

  disconnect: function () {
    console.log('disconnecting from server');
    try {
      if (ws) {
        ws.close();
        ws = undefined; // doesn't compile because of strictNullChecks === true :( how to deinit a variable
      } else {
        console.log('ws is not defined');
      }
    } catch (err) {
      console.log('disconnecting err=%s', err);
    }
  }
};

console.log('ws_client:-');
