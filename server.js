let http = require('http');
let fs = require('fs');
let ws = require('ws');
const debug = require('debug')('my-server');

const PORT = 3000;

// Create a server and the handler for a few requests
let http_server = http.createServer((req, res) => {
  debug('req.url=' + req.url);
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


// Create WebSocket Server and handle some events
let ws_server = new ws.Server({server: http_server});

function secs2ms(secs) {
  return secs * 1000;
}

var conn_id = 0;

function Connection() {
  this.id = conn_id++;
  this.toString = () => {
    return `Connection: id=${this.id}`;
  };
}

ws_server.on('connection', (ws) => {

  let conn = new Connection();
  conn.ws = ws;
  debug('onConnect: conn=%s', conn.toString());
  startEventGenerator(conn, secs2ms(10), secs2ms(3));

  ws.on('close', (code, reason) => {
    debug('ws: closed code=%d reason=\'%s\' conn=%s',
      code, reason, conn.toString());
    stopEventGenerator(conn);
  });

  ws.on('message', (msg, masked) => {
    debug('ws_server: message msg=%s masked=%s',
      msg.data, masked);
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
  debug('startEventGenerator:+ delay=%d spacing=%d conn=%s',
    delay, spacing, conn.toString());

  conn.delay = delay;
  conn.spacing = spacing;
  conn.timeout = 0;
  let prevToString = conn.toString;
  conn.toString = () => {
    return prevToString() + ` delay=${conn.delay} spacing=${conn.spacing} timeout=${conn.timeout}`;
  };

  conn.timeoutObj = setTimeout(() => {
    timeout(conn, 'initial');
  }, conn.delay);

  debug('startEventGenerator:- delay=%d spacing=%d conn=%s',
    delay, spacing, conn.toString());
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
    conn.ws.send(`hi client ${conn.timeout}`);
    conn.timeout += 1;
    debug('timeout: str=%s conn=%s', str, conn.toString());
    setTimeout(() => {
      timeout(conn, 'continuing');
    }, conn.spacing);
  } else {
    debug('timeout: stopped');
  }
}
