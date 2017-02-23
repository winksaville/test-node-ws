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

function secs2ms(secs) {
  return secs * 1000;
}

var conn_id = 0;

function Connection() {
  this.id = conn_id++;
  this.stringify = () => {
    return `Connection: id=${this.id}`;
  };
}

ws_server.on('connection', (ws) => {

  let conn = new Connection();
  conn.ws = ws;
  console.log('onConnect: conn=%s', conn.stringify());
  startEventGenerator(conn, secs2ms(10), secs2ms(3));

  console.log('ws_server: conn=%s', conn.stringify());

  ws.on('close', (code, reason) => {
    console.log('ws: closed code=%d reason=\'%s\' conn=%s',
      code, reason, conn.stringify());
    stopEventGenerator(conn);
  });

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

function startEventGenerator(conn, delay, spacing) {
  console.log('startEventGenerator:+ delay=%d spacing=%d conn=%s',
    delay, spacing, conn.stringify());

  conn.delay = delay;
  conn.spacing = spacing;
  conn.timeout = 0;
  let prevStringify = conn.stringify;
  conn.stringify = () => {
    return prevStringify() + ` delay=${conn.delay} spacing=${conn.spacing} timeout=${conn.timeout}`;
  };

  conn.timeoutObj = setTimeout(() => {
    timeout(conn, 'initial');
  }, conn.delay);

  console.log('startEventGenerator:- delay=%d spacing=%d conn=%s',
    delay, spacing, conn.stringify());
}

function stopEventGenerator(conn) {
  console.log('stopEventGenerator:+ conn=%s', conn.stringify());

  clearTimeout(conn.timeoutObj);
  conn.timeoutObj = null;

  console.log('stopEventGenerator:- conn=%s', conn.stringify());
}

function timeout(conn, str) {
  if (conn.timeoutObj) {
    conn.ws.send(`hi client ${conn.timeout}`);
    conn.timeout += 1;
    console.log('timeout: str=%s conn=%s', str, conn.stringify());
    setTimeout(() => {
      timeout(conn, 'continuing');
    }, conn.spacing);
  } else {
    console.log('timeout: stopped');
  }
}
