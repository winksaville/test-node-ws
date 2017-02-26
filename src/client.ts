import { WsClient } from './ws_client';
import * as m from 'mithril';

// To enable in the browser use the browser console to set
// localStorage.debug='my-client'
const debug = require('debug')('my-client');

var ws_client = new WsClient();

function connect() {
  debug('connect');
  ws_client.connect('localhost:3000');
}

function disconnect() {
  debug('disconnect');
  ws_client.disconnect();
}

function sendMsg() {
  debug('sendMsg');
  let msg_text = <HTMLInputElement>document.getElementById('msg_text');
  if (msg_text && msg_text.value) {
    ws_client.sendMsg(msg_text.value);
  }
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
