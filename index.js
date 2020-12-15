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

const fs = require('fs');
const _config = require('jsonc').parse(fs.readFileSync('./config.json', 'utf8'));
const player = require('play-sound')({ players: ['mplayer'] });

// Read & Init config
const config = {}
console.log('Loading config...')
config.soundLocations = new Map();
console.log('Loading sound locations...');
_config.sound_locations.forEach((item) => {
    console.log('Loading sound location ' + item.name + '...');
    config.soundLocations.set(item.name, item.path);
});
config.timeSectors = new Map();
console.log('Loading time sectors...');
_config.time_sectors.forEach((item) => {
    // Push the time sector in
    console.log('Loading time sector ' + item.name + '...');

    config.timeSectors.set(item.name, item);
});
console.log('Loaded!');

function check() {
    // Called when a bell event is fired (every minute)
    console.log('BELLCHECK: Checking for applicable bells...');
    // Loop through each time sector...
    for (let [, sector] of Array.from(config.timeSectors.entries())) {
        console.log('BELLCHECK: Scanning sector ' + sector.name);
        // Get dates to compare...
        let checkDate = new Date().valueOf();
        let startDate = new Date(new Date().getFullYear(), sector.timings.start.month - 1, sector.timings.start.date).valueOf();
        let endDate = new Date(new Date().getFullYear(), sector.timings.end.month - 1, sector.timings.end.date).valueOf();
        // compare them...
        if (checkDate >= startDate && checkDate <= endDate) {
            console.log('BELLCHECK: Time sector ' + sector.name + ' applies to current date.');
            console.log('BELLCHECK: Checking for applicable timecards...');
            for (let card of sector.timecards) {
                let weeks = [];
                
                // check if it's a valid day
                const { days: timings } = card;
                if (timings.Sunday) weeks.push(0);
                if (timings.Monday) weeks.push(1);
                if (timings.Tuesday) weeks.push(2);
                if (timings.Wednesday) weeks.push(3);
                if (timings.Thursday) weeks.push(4);
                if (timings.Friday) weeks.push(5);
                if (timings.Saturday) weeks.push(6);

                let curday = new Date().getDay();
                if (weeks.includes(curday)) {
                    console.log('BELLCHECK: Timecard ' + card.name + ' applies to current date.');
                    console.log('BELLCHECK: Checking events...');
                    // check and play!
                    for (let event of card.events) {
                        if (new Date().getHours() === event.timings.hours && new Date().getMinutes() === event.timings.minutes) {
                            console.log('BELLCHECK: bell applies!');

                            player.play(config.soundLocations.get(card.bell_sound), (err) => {
                                if (err) {
                                    console.error('FAILED TO READ SOUND FILE!');
                                    console.error(err);
                                    process.exit(1);
                                }
                            });
                        }
                    }
                }
            }
        }
    };
}

setInterval(check, 60000);

check();