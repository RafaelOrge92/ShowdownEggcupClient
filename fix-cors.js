const fs = require('fs');

let js = fs.readFileSync('play.pokemonshowdown.com/js/client-connection.js', 'utf8');

js = js.replace("url='https://'+Config.routes.client+url;", "url='https://corsproxy.io/?https://'+Config.routes.client+url;");

fs.writeFileSync('play.pokemonshowdown.com/js/client-connection.js', js);
console.log('CORS bypassed via proxy');
