console.log('ws_client:+');

export let ws_client = {
  connect: function () {
    console.log('connecting to server');

    let ws = new WebSocket('ws://localhost:3000');
    console.log('create ws done');

    ws.onopen = function(evt) {
      console.log('ws.onopen: connected evt=' + JSON.stringify(evt));
    };

    ws.onclose = function(evt) {
      console.log('ws.onclose: disconnected evt=' + JSON.stringify(evt));
    };

    ws.onmessage = function (evt) {
      console.log('ws.onmessage: evt=' + JSON.stringify(evt));
    };

    ws.onerror = function(evt) {
      console.log('ws.onerror: evt=' + JSON.stringify(evt));
    };
  }
};

console.log('ws_client:-');
