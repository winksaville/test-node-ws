import { WsClient } from './ws_client';
var m = require('mithril');

var ws_client = new WsClient();

function connect() {
  ws_client.connect('localhost:3000');
}

function disconnect() {
  ws_client.disconnect();
}

function sendMsg() {
  let msg_text = document.getElementById('msg_text').value;
  ws_client.sendMsg(msg_text);
}

m.render(document.body,
  m('div', 'Hello, click to ', [
    m('a', {href: 'http://localhost:3000'}, 'reload'),
    m('br'),
    m('button', {onclick: connect }, "connect to server"),
    m('br'),
    m('button', {onclick: disconnect}, "disconnect from server"),
    m('br'),
    m('msg_div', 'Msg to send ', [
      m('input', {id: 'msg_text', type: 'text'}),
      m('br'),
      m('button', {onclick: sendMsg}, "send msg")
    ]),
  ])
);
