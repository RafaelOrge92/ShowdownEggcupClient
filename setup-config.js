const fs = require('fs');
let cfg = fs.readFileSync('config/config.js', 'utf8');
cfg = cfg.replace(/id: 'urgency-joyfully-overpay.ngrok-free.dev'/, "id: 'showdown'");
cfg = cfg.replace(/registered: false/, "registered: true");
fs.writeFileSync('config/config.js', cfg);
