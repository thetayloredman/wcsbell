// wcsbell
// By Logan Devine
// For Willits Charter School

// Modules
const fs = require('fs').promises;
const express = require('express');
const enmap = require('enmap');

// Config
const WEB_PORT = 8081;

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
    app.listen(8080, () => {
        console.log('Web server listening on port ' + WEB_PORT + '!');
    });
})();