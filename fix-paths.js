const fs = require('fs');

// Fix client-connection.js
let js = fs.readFileSync('play.pokemonshowdown.com/js/client-connection.js', 'utf8');
js = js.replace(/new Worker\('\/js\/client-connection-worker\.js'\)/g, "new Worker('js/client-connection-worker.js')");
fs.writeFileSync('play.pokemonshowdown.com/js/client-connection.js', js);

// Fix testclient-new.html
let html = fs.readFileSync('play.pokemonshowdown.com/testclient-new.html', 'utf8');
html = html.replace(/src=\"\/js\//g, 'src=\"js/');
fs.writeFileSync('play.pokemonshowdown.com/testclient-new.html', html);

console.log('Paths fixed');
