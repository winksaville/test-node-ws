let http = require('http');

const PORT = 3000;

let server = http.createServer( (req, res) => {
  res.end('<body>Hello, click to <a href=http://localhost:' + PORT + req.url + '>reload</a></body>');
});

server.listen(PORT, () => {
  console.log('Listening on: http://localhost:%s', PORT);
});
