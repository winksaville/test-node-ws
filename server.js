let http = require('http');
let fs = require('fs');
let ws = require('ws');

const PORT = 3000;

// Create a server and the handler for a few requests
let http_server = http.createServer((req, res) => {
  console.log('req.url=' + req.url);
  switch (req.url) {
    case '/': {
      res.writeHead(200, {
        'content-type': 'text/html',
        'charset': 'UTF-8'
      });

      fs.createReadStream('./index.html').pipe(res)
      break;
    }
    case '/bundle.js': {
      res.writeHead(200, {
        'content-type': 'text/javascript',
        'charset': 'UTF-8'
      });

      fs.createReadStream('./bundle.js').pipe(res)
      break;
    }
    default: {
      console.log('default: req.url=' + req.url);
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
  console.log('Listening on: http://localhost:%s', PORT);
});


// Create WebSocket Server and handle some events
let ws_server = new ws.Server({server: http_server});

ws_server.on('connection', (ws) => {
  console.log('ws_server: connection created ws=%s', ws);
});

ws_server.on('error', (err) => {
  console.log('ws_server: error err=%s', err);
});

ws_server.on('headers', (headers) => {
  console.log('ws_server: headers=%s', JSON.stringify(headers));
});

ws_server.on('listening', () => {
  console.log('ws_server: listening');
});
