'use strict';
var builder = require('botbuilder');


module.exports = [
	// function (session) {
    //     session.send('You can use either a Hero or a Thumbnail card to send the user visually rich information. On Facebook both will be rendered using the same Generic Template...');

    //     var msg = new builder.Message(session)
    //         .attachments([
    //             new builder.HeroCard(session)
    //                 .title('Hero Card')
    //                 .subtitle('The Space Needle is an observation tower in Seattle, Washington, a landmark of the Pacific Northwest, and an icon of Seattle.')
    //                 .images([
    //                     builder.CardImage.create(session, 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Seattlenighttimequeenanne.jpg/320px-Seattlenighttimequeenanne.jpg')
    //                 ])
    //                 .tap(builder.CardAction.openUrl(session, 'https://en.wikipedia.org/wiki/Space_Needle'))
    //         ]);
    //     session.send(msg);

    //     msg = new builder.Message(session)
    //         .attachments([
    //             new builder.ThumbnailCard(session)
    //                 .title('Thumbnail Card')
    //                 .subtitle('Pike Place Market is a public market overlooking the Elliott Bay waterfront in Seattle, Washington, United States.')
    //                 .images([
    //                     builder.CardImage.create(session, 'https://upload.wikimedia.org/wikipedia/en/thumb/2/2a/PikePlaceMarket.jpg/320px-PikePlaceMarket.jpg')
    //                 ])
    //                 .tap(builder.CardAction.openUrl(session, 'https://en.wikipedia.org/wiki/Pike_Place_Market'))
    //         ]);
    //     session.endDialog(msg);
    // },
    function (session) {
        session.send('Bots can register global actions, like the \'help\' & \'goodbye\' actions, that can respond to user input at any time. You can even bind actions to buttons on a card.');

        var msg = new builder.Message(session)
            .attachments([
                new builder.HeroCard(session)
                    .title('Space Needle')
                    .subtitle('The Space Needle is an observation tower in Seattle, Washington, a landmark of the Pacific Northwest, and an icon of Seattle.')
                    .images([
                        builder.CardImage.create(session, 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Seattlenighttimequeenanne.jpg/320px-Seattlenighttimequeenanne.jpg')
                    ])
                    .buttons([
                        builder.CardAction.dialogAction(session, 'weather', 'Seattle, WA', 'Current Weather')
                    ])
            ]);
        session.send(msg);

        session.endDialog('The \'Current Weather\' button on the card above can be pressed at any time regardless of where the user is in the conversation with the bot. The bot can even show the weather after the conversation has ended.');
    }
];