// This is the WCSBell Configuration file.
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

// This is the root of the file.
// This file contains ALL WCSBell configuration items.
//
// This includes:
// * Time schedules
// * Paths to sounds
// * General Configuration
// * Etc.
module.exports = {
    // ========== SOUND PATHS ==========
    // For WCSBell to run, we need locations of the sounds
    // to use.
    //
    // This config option specifies the locations.
    sound_locations: [
        // This array will contain a list of objects
        // which name the sound.
        {
            // Name of the sound to be referenced
            // later in the config, remember this!
            name: 'main',
            // Path to the sound, relative to the
            // location you launch WCSBell from.
            path: './sounds/main.mp3'
        }
        // To add another sound, just add:
        /*
        {
            name: 'name',
            path: './sounds/path.mp3'
        }
        */
        // Remember to use commas!
    ],
    
    // ========== TIME SECTORS ==========
    // A time sector is used to indicate
    // a section of time, like summer
    // vs spring etc.
    time_sectors: [
        // This is an example time sector, you
        // may need to modify it to fit your needs.
        {
            // The name of the time sector
            name: 'Summer',
            // The time settings for this sector
            timings: {
                // When shall this sector start?
                start: {
                    // Month code, 1 for january, 12 for december.
                    month: 6,
                    // Date to start
                    date: 20
                },
                // And when to end it?
                end: {
                    // Month code, 1 for january, 12 for december.
                    month: 9,
                    // Date to start
                    date: 22
                }
            },
            // Now the biggie.
            // This is the timecards for this sector.
            // A timecard is a specific day-like card
            // of bells.
            //
            // For example you could have a Monday card
            // and a Tuesday card, or you could disable
            // weekends, etc.
            timecards: [
                // This is an example weekday time card,
                // you will need to modify it to fit your
                // needs.
                {
                    // You can guess what this does by now...
                    name: 'Some Timecard',
                    // What days do we trigger this card on?
                    days: {
                        Sunday: false, // false = off & true = on
                        Monday: true,
                        Tuesday: true,
                        Wednesday: true,
                        Thursday: true,
                        Friday: true,
                        Saturday: false
                    },

                    // What bell sound do we use for this timecard?
                    bell_sound: 'main', // See line 37 for bell sounds

                    // The most important bit of it all, events.
                    //
                    // Each "event" is the actual time.
                    // Events for this card go here...
                    events: [
                        // Here's a sample set of 2 events.
                        {
                            // The name for the event...
                            name: 'Math',
                            // The timing...
                            timings: {
                                // 24 hour time format...
                                hours: 09, // starting with a 0 is optional.
                                // and minutes
                                minutes: 00, // same here ^^^
                                // ^^^ triggers at 9:00 AM
                            }
                        },
                        {
                            name: 'Lunch',
                            timings: {
                                hours: 12,
                                minutes: 30
                            }
                            // ^^^ triggers at 12:30 PM
                        }
                    ]
                }
            ]
        }
    ]
}