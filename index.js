// wcsbell
// By Logan Devine
// For Willits Charter School

// Modules
const fs = require('fs').promises;
const express = require('express');
const enmap = require('enmap');
const cp = require('cookie-parser');

// Config
// Only modify this if you know what you are doing!
const WEB_PORT = 8081;
const AUTH_KEY_LENGTH = 10;

// Validate
if (AUTH_KEY_LENGTH > 10) {
    console.log('AUTH_KEY_LENGTH must be 10 or fewer.');
    process.exit(1);
}

// Main
(async () => {
    console.clear();
    console.log('wcsbell');
    console.log('By Logan Devine');
    console.log('For Willits Charter School');
    console.log('');
    console.log('Please wait as WCSBell initializes...');
    console.log('This may take a while...');
    // Initialize DBs
    const config = new enmap({ name: 'config' });

    // Post init
    console.log('Initialized!');
    console.log('Initializing a web server on port ' + WEB_PORT + '...');
    const app = new express();
    app.use(cp());
    app.listen(WEB_PORT, async () => {
        console.log('Web server listening on port ' + WEB_PORT + '!');
        let s = config.ensure('ready', false);
        console.log('');
        let AUTH_KEY_MAX = 0;
        for (let i = 0; i < AUTH_KEY_LENGTH; i++) {
            AUTH_KEY_MAX += (9).toString();
        }
        let AUTH_KEY = Math.floor(Math.random() * AUTH_KEY_MAX).toString();
        while (AUTH_KEY.length < AUTH_KEY_LENGTH) {
            AUTH_KEY = '0' + AUTH_KEY;
        }
        if (!s) {
            console.log('');
            console.log('[----- URGENT -----]');
            console.log('You haven\'t set up WCSBell yet!');
            console.log('Please go to "this.machines.ip' + (WEB_PORT === 8080 ? '' : (':' + WEB_PORT)) + '/" and begin setup!');
            console.log('Authorization key is "' + AUTH_KEY + '".');
            console.log('[--- END URGENT ---]')
            app.get('/setup', (req, res) => {
                console.log('!!! User opened /setup !!!');
                res.header('Content-Type', 'text/html');
                res.end(`<!DOCTYPE html>
<html>
    <head>
        <title>WCSBell Setup</title>
    </head>
    <body>
        <h1>WCSBell Setup</h1>
        <input type="text" id="pin" placeholder="Enter the auth key:"></input>
        <br />
        <button onclick="subm()">Submit</button>
        <script>
            function subm() {
                let d = document.getElementById('pin').value;
                document.cookie = "pin="+d;
                document.location.href = "/setup/d"
            }
        </script>
    </body>
</html>`)
            });
            app.get('/setup/d', async (req, res) => {
                if (req.cookies.pin !== AUTH_KEY) {
                    res.header('Content-Type', 'text/html')
                    res.end('Not authorized. <a href="/setup">go here</a>')
                } else {
                    console.log('!!!!! USER AUTHORIZED !!!!!');
                    res.end(`<!DOCTYPE html>
<html>
    <head>
        <title>WCSBell Setup</title>
    </head>
    <body>
        <div id="root">
        
        </div>
        <script src="/setup.js"></script>
    </body>
</html>`)
                }
            });
            app.get('/setup.js', async (req, res) => {
                let c = await fs.readFile('./setup.js').catch(() => 'document.body.innerHTML = "error reading script!"');
                res.end(c);
            });
            app.use('/', (req, res) => {
                res.redirect('/setup');
            });
        }
    });
})();