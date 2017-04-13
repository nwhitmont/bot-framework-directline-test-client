/*
    @summary Direct Line test client for Bot Framework

    @author Nils Whitmont <nils.whitmont@gmail.com>

 */
// LOAD ENV
require('dotenv-extended').load();

// LOAD NODE MODULES
import { DirectLine } from 'botframework-directlinejs';
import { ConnectionStatus } from 'botframework-directlinejs';

// LOCAL VARS
const useWebSocket = true;


// configure direct line client options
const directLine = new DirectLine({
    secret: 'Ig187T_qrtQ.cwA.9Ks.iNU4d9eu-19cYYdjf-AHPpBKa5BetgPDpW5PsynaE8Q',
    webSocket: useWebSocket
});

// monitor connection status
directLine.connectionStatus$
    .subscribe(connectionStatus => {
        switch(connectionStatus) {
            case ConnectionStatus.Uninitialized:    // the status when the DirectLine object is first created/constructed
                console.log("Direct Line object created");
                break;
            case ConnectionStatus.Connecting:       // currently trying to connect to the conversation
                console.log("Trying to connect to the conversation...");
                break;
            case ConnectionStatus.Online:           // successfully connected to the converstaion. Connection is healthy so far as we know.
                console.log("Successfully connected to the conversation!"):
                break;
            case ConnectionStatus.ExpiredToken:     // last operation errored out with an expired token. Your app should supply a new one.
                console.log("Last operation errored out with an expired token");
                break;
            case ConnectionStatus.FailedToConnect:  // the initial attempt to connect to the conversation failed. No recovery possible.
                console.log("Direct Line client failed to connect to conversation.");
                break;
            case ConnectionStatus.Ended:            // the bot ended the conversation
                console.log("The bot ended the conversation.");
                break;
            default:
                console.log("This should never get called. Ooops!");
        }
    });

directLine.activity$
    .filter(activity => activity.type === 'message')
    .subscribe(
        message => console.log("received message ", message)
    );

// listen to activities sent by the bot
//directLine.activity$.subscribe(activity => console.log("Received activity: ", activity));

// subscribe to messages from the bot
directLine.activity$
    .filter(activity => activity.type === 'message')
    .subscribe(
        message => console.log("received message ", message)
    );


// post a message to the bot
directLine.postActivity({
    from: { id: '2794' }, // required (from.name is optional)
    type: 'message',
    text: 'POST direct line message to bot'
}).subscribe(
    id => console.log("Posted activity, assigned ID ", id),
    error => console.log("Error posting activity", error)
);


// END OF LINE
