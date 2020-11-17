/******************************************************************************************************************************************/
/*WWWWWWWW                           WWWWWWWW      CCCCCCCCCCCCC   SSSSSSSSSSSSSSS BBBBBBBBBBBBBBBBB                      lllllll lllllll */
/*W::::::W                           W::::::W   CCC::::::::::::C SS:::::::::::::::SB::::::::::::::::B                     l:::::l l:::::l */
/*W::::::W                           W::::::W CC:::::::::::::::CS:::::SSSSSS::::::SB::::::BBBBBB:::::B                    l:::::l l:::::l */
/*W::::::W                           W::::::WC:::::CCCCCCCC::::CS:::::S     SSSSSSSBB:::::B     B:::::B                   l:::::l l:::::l */
/* W:::::W           WWWWW           W:::::WC:::::C       CCCCCCS:::::S              B::::B     B:::::B    eeeeeeeeeeee    l::::l  l::::l */
/*  W:::::W         W:::::W         W:::::WC:::::C              S:::::S              B::::B     B:::::B  ee::::::::::::ee  l::::l  l::::l */
/*   W:::::W       W:::::::W       W:::::W C:::::C               S::::SSSS           B::::BBBBBB:::::B  e::::::eeeee:::::eel::::l  l::::l */
/*    W:::::W     W:::::::::W     W:::::W  C:::::C                SS::::::SSSSS      B:::::::::::::BB  e::::::e     e:::::el::::l  l::::l */
/*     W:::::W   W:::::W:::::W   W:::::W   C:::::C                  SSS::::::::SS    B::::BBBBBB:::::B e:::::::eeeee::::::el::::l  l::::l */
/*      W:::::W W:::::W W:::::W W:::::W    C:::::C                     SSSSSS::::S   B::::B     B:::::Be:::::::::::::::::e l::::l  l::::l */
/*       W:::::W:::::W   W:::::W:::::W     C:::::C                          S:::::S  B::::B     B:::::Be::::::eeeeeeeeeee  l::::l  l::::l */
/*        W:::::::::W     W:::::::::W       C:::::C       CCCCCC            S:::::S  B::::B     B:::::Be:::::::e           l::::l  l::::l */
/*         W:::::::W       W:::::::W         C:::::CCCCCCCC::::CSSSSSSS     S:::::SBB:::::BBBBBB::::::Be::::::::e         l::::::ll::::::l*/
/*          W:::::W         W:::::W           CC:::::::::::::::CS::::::SSSSSS:::::SB:::::::::::::::::B  e::::::::eeeeeeee l::::::ll::::::l*/
/*           W:::W           W:::W              CCC::::::::::::CS:::::::::::::::SS B::::::::::::::::B    ee:::::::::::::e l::::::ll::::::l*/
/*            WWW             WWW                  CCCCCCCCCCCCC SSSSSSSSSSSSSSS   BBBBBBBBBBBBBBBBB       eeeeeeeeeeeeee llllllllllllllll*/
/******************************************************************************************************************************************/

const _config = require('./config.js');
const fs = require('fs');

// Read & Init config
const config = {}
console.log('Loading config...')
config.soundLocations = new Map();
console.log('Loading sound locations...');
_config.sound_locations.forEach((item) => {
    console.log('Loading sound location ' + item.name + '...');
    config.soundLocations.set(item.name, fs.readFileSync(item.path));
});
config.timeSectors = new Map();
console.log('Loading time sectors...');
_config.time_sectors.forEach((item) => {
    console.log('Loading time sector ' + item.name + '...');

    config.timeSectors.set(item.name, item);
});
console.log('Loaded!');

function check() {
    console.log('BELLCHECK: Checking for applicable bells...');
    for (let [, sector] of Array.from(config.timeSectors.entries())) {
        console.log('BELLCHECK: Scanning sector ' + sector.name);
        let checkDate = new Date().valueOf();
        let startDate = new Date(new Date().getFullYear(), sector.timings.start.month - 1, sector.timings.start.date).valueOf();
        let endDate = new Date(new Date().getFullYear(), sector.timings.end.month - 1, sector.timings.end.date).valueOf();
        if (checkDate >= startDate && checkDate <= endDate) {
            console.log('BELLCHECK: Time sector ' + sector.name + ' applies to current date.');
            console.log('BELLCHECK: Checking for applicable timecards...')
        }
    };
}

setInterval(check, 60000);

check();

console.log(require('util').inspect(config, void 0, Infinity, true));