import { WsClient } from './ws_client';
var m = require('mithril');

var ws_client = new WsClient();

function connect() {
  ws_client.connect('localhost:3000');
}

m.render(document.body,
  m('div', 'Hello, click to ', [
    m('a', {href: 'http://localhost:3000'}, 'reload'),
    m('br'),
    m('button', {onclick: connect }, "connect to server"),
    m('br'),
    m('button', {onclick: ws_client.disconnect}, "disconnect from server")
  ])
);
