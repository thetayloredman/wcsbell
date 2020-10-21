// wcsbell
// By Logan Devine
// For Willits Charter School

// Modules
const fs = require('fs').promises;
const express = require('express');
const enmap = require('enmap');

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
    app.listen(WEB_PORT, () => {
        console.log('Web server listening on port ' + WEB_PORT + '!');
        let s = config.ensure('ready', false);
        console.log('');
        if (!s) {
            console.log('');
            console.log('[----- URGENT -----]');
            console.log('You haven\'t set up WCSBell yet!');
            console.log('Please go to "this.machines.ip' + (WEB_PORT === 8080 ? '' : (':' + WEB_PORT)) + '/" and begin setup!');
            let AUTH_KEY_MAX = 0;
            for (let i = 0; i < AUTH_KEY_LENGTH; i++) {
                AUTH_KEY_MAX += (9).toString();
            }
            let AUTH_KEY = Math.floor(Math.random() * AUTH_KEY_MAX).toString();
            while (AUTH_KEY.length < AUTH_KEY_LENGTH) {
                AUTH_KEY = '0' + AUTH_KEY;
            }
            console.log('Authorization key is "' + AUTH_KEY + '".');
            app.use('/setup', (req, res) => {
                
            });
        }
    });
})();