const fs = require('fs');
const modData = fs.readFileSync('../pokemon-showdown/data/mods/eggcup/pokedex.ts', 'utf8');
let clientData = fs.readFileSync('play.pokemonshowdown.com/data/pokedex.js', 'utf8');

// Match each pokemon block: "pokemonid: { inherit: true, ... },"
const regex = /([a-z0-9]+):\s*\{\s*inherit:\s*true,([\s\S]*?)\n\t\},/g;
let match;
while ((match = regex.exec(modData)) !== null) {
    const id = match[1];
    const props = match[2];
    
    let typesMatch = props.match(/types:\s*(\[.*?\])/);
    let statsMatch = props.match(/baseStats:\s*(\{.*?\})/);
    
    if (typesMatch || statsMatch) {
        let startIdx = clientData.indexOf(`${id}:{`);
        if (startIdx === -1) startIdx = clientData.indexOf(`"${id}":{`);
        if (startIdx !== -1) {
            let braceCount = 0;
            let endIdx = -1;
            for (let i = startIdx + id.length + 1; i < clientData.length; i++) {
                if (clientData[i] === '{') braceCount++;
                else if (clientData[i] === '}') {
                    braceCount--;
                    if (braceCount === 0) {
                        endIdx = i;
                        break;
                    }
                }
            }
            
            if (endIdx !== -1) {
                let content = clientData.substring(startIdx, endIdx + 1);
                
                if (typesMatch) {
                    content = content.replace(/types:\[.*?\],?/, `types:${typesMatch[1].replace(/\s/g, '')},`);
                }
                if (statsMatch) {
                    content = content.replace(/baseStats:\{.*?\},?/, `baseStats:${statsMatch[1].replace(/\s/g, '')},`);
                }
                
                clientData = clientData.substring(0, startIdx) + content + clientData.substring(endIdx + 1);
            }
        }
    }
}
fs.writeFileSync('play.pokemonshowdown.com/data/pokedex.js', clientData, 'utf8');
console.log('Patched');
