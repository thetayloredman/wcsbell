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

module.exports = class Configuration {
    constructor(data) {
        this.soundLocations = data.sound_locations;
        this.sounds = new Map(this.soundLocations.map((data) => [ data.name, data.path ]));
        this.timeSectors = new (require('./TimeSectorManager.js'))(data.time_sectors);
    }
}