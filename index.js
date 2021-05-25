#!/usr/bin/env node
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
const player = require('play-sound')({ players: ['mplayer'] });
const cron = require('node-cron');
const csv = require('csv-parse/lib/sync');
const { exec } = require('child_process');

// ***** CHANGE ME TO MODIFY THE BEHAVIOR WHEN BELLCHECK FAILS
// >>>>> Panic when there is an error? (Otherwise, just oops)
const PANIC_ON_BELLCHECK_FAIL = false;
// >>>>> Run notify-send on bell?
const NOTIFY_SEND_ON_BELL     = true;

const cfg = csv(fs.readFileSync(process.env.CONFIG_FILE || './config.csv'), { columns: true, skip_empty_lines: true });
console.log('[INFO] Loaded bells from config.csv.');
console.log('[INFO] Configuration in use:');
for (let bell of cfg) {
    console.log(`[INFO]   Bell ${bell.Name}:`);
    console.log(`[INFO]     Name:  ${bell.Name}`);
    console.log(`[INFO]     Sound: ${bell['Sound Filename']}`);
    console.log(`[INFO]     Time:  ${bell['Time (24-hour)']}`);
}

function panic(m) {
    console.error(`*** STOP [${Date.now()}]`);
    console.error('+++ Crash message:');
    for (let c of m.split('\n')) {
        console.error(`>>> ${c}`);
    }
    console.error('+++ Backtrace:');
    console.trace();
    console.error('*** Aborting (try to reproduce the crash with core dumps enabled if needed)');
    process.abort();
}
function oops(m) {
    console.log(String.raw` _______
< Oops! >
 -------
        \   ^__^
         \  (xx)\_______
            (__)\       )\/\
             U  ||----w |
                ||     ||
`);
    console.error(`*** Oops! [${Date.now()}]`);
    console.error('+++ Oops message:');
    for (let c of m.split('\n')) {
        console.error(`>>> ${c}`);
    }
    console.error('+++ Backtrace:');
    console.trace();
}

function check() {
    // Called when a bell event is fired (every minute)
    console.log('BELLCHECK: Checking for applicable bells...');
    for (let event of cfg) {
        let d = new Date();
        let hours = d.getHours(),
            mins  = d.getMinutes();
        let time = event['Time (24-hour)'].split(':');
        let [isHours, isMins] = time;
        isHours = parseInt(isHours);
        isMins  = parseInt(isMins);
        if (hours === isHours && mins === isMins) {
            console.log('BELLCHECK: bell ' + event['Name'] + ' applies!');

            player.play(`./sounds/${event['Sound Filename']}`, (err) => {
                if (err) {
                    console.error('Error playing sound:');
                    console.error(err);
                    if (PANIC_ON_BELLCHECK_FAIL) {
                        panic('Failed to play sound. Does the file exist?');
                    } else {
                        oops('Failed to play sound. Does the file exist?');
                    }
                }
            });
            if (NOTIFY_SEND_ON_BELL) {
                exec('notify-send "Bell is ringing"');
            }
        }
    }
}

cron.schedule('* * * * *', check);
