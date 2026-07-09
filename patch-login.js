const fs = require('fs');

let js = fs.readFileSync('play.pokemonshowdown.com/js/client-connection.js', 'utf8');

// The replacement code that overrides rawQuery completely
const newRawQuery = `  rawQuery=function rawQuery(act,data){
if (act === 'getassertion') return Promise.resolve('];;');
if (act === 'login') return Promise.resolve(']' + JSON.stringify({actionsuccess:true, assertion:';;'}));
return Promise.resolve('');
};\n`;

// Find the start of the rawQuery function
const startIndex = js.indexOf('rawQuery=function rawQuery(act,data){');
if (startIndex !== -1) {
    // Find the end of the rawQuery function.
    const endIndex = js.indexOf('query=function query(act)', startIndex);
    if (endIndex !== -1) {
        js = js.substring(0, startIndex) + newRawQuery + js.substring(endIndex);
        fs.writeFileSync('play.pokemonshowdown.com/js/client-connection.js', js);
        console.log('Successfully patched client-connection.js to bypass action.php');
    } else {
        console.error('Could not find the end of rawQuery');
    }
} else {
    console.error('Could not find the start of rawQuery');
}
