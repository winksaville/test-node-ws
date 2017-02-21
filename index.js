var m = require('mithril');

m.render(document.body,
  m('div', 'Hello, click to ', [
   m('a', {href: 'http://localhost:3000'}, 'reload')
  ])
);
