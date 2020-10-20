// wcsbell
// By Logan Devine
// For Willits Charter School

// Modules
const fs = require('fs');

// Init
console.log('wcsbell');
console.log('Loading files...')

// Init config
let config = new Map();

// Parse configs
function ensureDir(p) {
    let f = [];
    try {
        f = fs.readdirSync(p);
    } catch (e) {
        f = [];
        if (e.code === 'ENOENT') {
            try {
                fs.mkdirSync(p);
            } catch (e) {
                console.error(e);
                process.exit(1);
            }
        } else {
            console.error(e);
            process.exit(1);
        }
    }

    return f;
}
function ensureFile(p, d) {
    let c = '';
    try {
        c = fs.readFileSync(p, 'utf-8');
    } catch (e) {
        c = '';
        if (e.code === 'ENOENT') {
            try {
                fs.writeFileSync(p, d);
            } catch (e) {
                console.error(e);
                process.exit(1);
            }
        } else {
            console.error(e);
            process.exit(1);
        }
    }

    return c;
}
function readConfig() {
    let confDir = ensureDir('./conf/');
    console.log(confDir);
}
readConfig();