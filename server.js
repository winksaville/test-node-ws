let http = require('http');
let fs = require('fs')

const PORT = 3000;

// Create a server and the handler for a few requests
var server = http.createServer((req, res) => {
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
server.listen(PORT, () => {
  console.log('Listening on: http://localhost:%s', PORT);
});
