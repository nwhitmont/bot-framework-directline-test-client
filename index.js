"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
    @summary Direct Line test client for Bot Framework

    @author Nils Whitmont <nils.whitmont@gmail.com>

 */
// LOAD ENV
require('dotenv-extended').load();
// LOAD NODE MODULES
var botframework_directlinejs_1 = require("botframework-directlinejs");
var botframework_directlinejs_2 = require("botframework-directlinejs");
// LOCAL VARS
var useWebSocket = true;
// configure direct line client options
var directLine = new botframework_directlinejs_1.DirectLine({
    secret: 'Ig187T_qrtQ.cwA.9Ks.iNU4d9eu-19cYYdjf-AHPpBKa5BetgPDpW5PsynaE8Q',
    webSocket: useWebSocket
});
// monitor connection status
directLine.connectionStatus$
    .subscribe(function (connectionStatus) {
    switch (connectionStatus) {
        case botframework_directlinejs_2.ConnectionStatus.Uninitialized:
            console.log("Direct Line object created");
            break;
        case botframework_directlinejs_2.ConnectionStatus.Connecting:
            console.log("Trying to connect to the conversation...");
            break;
        case botframework_directlinejs_2.ConnectionStatus.Online:
            console.log("Successfully connected to the conversation!");
            break;
        case botframework_directlinejs_2.ConnectionStatus.ExpiredToken:
            console.log("Last operation errored out with an expired token");
            break;
        case botframework_directlinejs_2.ConnectionStatus.FailedToConnect:
            console.log("Direct Line client failed to connect to conversation.");
            break;
        case botframework_directlinejs_2.ConnectionStatus.Ended:
            console.log("The bot ended the conversation.");
            break;
        default:
            console.log("This should never get called. Ooops!");
    }
});
directLine.activity$
    .filter(function (activity) { return activity.type === 'message'; })
    .subscribe(function (message) { return console.log("received message ", message); });
// listen to activities sent by the bot
//directLine.activity$.subscribe(activity => console.log("Received activity: ", activity));
// subscribe to messages from the bot
directLine.activity$
    .filter(function (activity) { return activity.type === 'message'; })
    .subscribe(function (message) { return console.log("received message ", message); });
// post a message to the bot
directLine.postActivity({
    from: { id: '2794' },
    type: 'message',
    text: 'POST direct line message to bot'
}).subscribe(function (id) { return console.log("Posted activity, assigned ID ", id); }, function (error) { return console.log("Error posting activity", error); });
// END OF LINE
