# test-node-ws
Test node and websocket


## Prerequesites
 - node.js
 - yarn or npm

## Install
```
yarn install
```

## Build
```
$ yarn build
yarn build v0.20.3
$ tsc && webpack client.js bundle.js
Hash: 0ac838cd6983d6988c06
Version: webpack 2.2.1
Time: 257ms
    Asset     Size  Chunks             Chunk Names
bundle.js  63.3 kB       0  [emitted]  main
   [0] (webpack)/buildin/global.js 509 bytes {0} [built]
   [1] ./~/mithril/mithril.js 43.6 kB {0} [built]
   [2] ./ws_client.js 1.92 kB {0} [built]
   [3] ./~/process/browser.js 5.3 kB {0} [built]
   [4] ./~/setimmediate/setImmediate.js 6.47 kB {0} [built]
   [5] ./~/timers-browserify/main.js 1.36 kB {0} [built]
   [6] ./client.js 488 bytes {0} [built]
Done in 2.48s.
```

## Running
```
$ yarn start
yarn start v0.20.3
$ node server.js
Listening on: http://localhost:3000
ws_server: listening
```
Accessing http://localhost:3000 on a browser will display
a webpage with `Hello, click to reload` the reload word is
a hyperlink and clicking on it will reload the page.

It also displays two buttons `connect to server` and
`disconnect from server` which connect and disconnect respectively.

The server code outputs logs to the server console and the client
outputs logs to the browser console. For the browser you'll need
to use developement tools to see the output.
