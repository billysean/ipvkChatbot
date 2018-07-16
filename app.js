var restify = require('restify')
var builder = require('botbuilder')
var azure = require('botbuilder-azure')
var builder_cognitiveservices = require("botbuilder-cognitiveservices")

var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});

var connector = new builder.ChatConnector({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword,
    openIdMetadata: process.env.BotOpenIdMetadata
})

server.post('/api/messages', connector.listen());
server.get('/', restify.plugins.serveStatic({
    directory: '.',
    default: '/index.html'
}));

var documentDBOptions = {
    host: 'https://ipvkcosmos.documents.azure.com:443/',
    masterKey: '79tib1ztPjaUQ8s9GxvELmCo6FyArTN9sL1JpLpQp4eKDkzbUoTzJVD2RzUUkVQzSnRVOu6ZRsm4xjeN4JQMlA',
    database: 'ipvk',
    collection: 'chatbot'
}

var docDbClient = new azure.DocumentDbClient(documentDBOptions);
var cosmosStorage = new azure.AzureBotStorage({ gzipData: false }, docDbClient);

var bot = new builder.UniversalBot(connector,function(session){
    session.send('hi welcome to IPVK bot');
});
bot.set('storage', cosmosStorage);


var ipvkGeneral = require('./dialogs/ipvk-general-dialog')
var ipvkAnalytics = require('./dialogs/ipvk-analytics-dialog')
bot.dialog('/ipvk', ipvkGeneral);
bot.dialog('/analytics', ipvkAnalytics);

bot.dialog('general', function (session) {
    session.beginDialog('/ipvk');
}).triggerAction({
    matches: /^general$/i
});

bot.dialog('analytics', function (session) {
    session.beginDialog('/analytics');
}).triggerAction({
    matches: /^analytics$/i
});



// /*-----------------------------------------------------------------------------
// A simple echo bot for the Microsoft Bot Framework. 
// -----------------------------------------------------------------------------*/

// var restify = require('restify');
// var builder = require('botbuilder');
// var botbuilder_azure = require("botbuilder-azure");
// var builder_cognitiveservices = require("botbuilder-cognitiveservices");

// // Setup Restify Server
// var server = restify.createServer();
// server.listen(process.env.port || process.env.PORT || 3978, function () {
//    console.log('%s listening to %s', server.name, server.url); 
// });
  
// // Create chat connector for communicating with the Bot Framework Service
// var connector = new builder.ChatConnector({
//     appId: process.env.MicrosoftAppId,
//     appPassword: process.env.MicrosoftAppPassword,
//     openIdMetadata: process.env.BotOpenIdMetadata 
// });

// // Listen for messages from users 
// server.post('/api/messages', connector.listen());

// /*----------------------------------------------------------------------------------------
// * Bot Storage: This is a great spot to register the private state storage for your bot. 
// * We provide adapters for Azure Table, CosmosDb, SQL Azure, or you can implement your own!
// * For samples and documentation, see: https://github.com/Microsoft/BotBuilder-Azure
// * ---------------------------------------------------------------------------------------- */

// var tableName = 'botdata';
// var azureTableClient = new botbuilder_azure.AzureTableClient(tableName, process.env['AzureWebJobsStorage']);
// var tableStorage = new botbuilder_azure.AzureBotStorage({ gzipData: false }, azureTableClient);

// // Create your bot with a function to receive messages from the user
// var bot = new builder.UniversalBot(connector);
// bot.set('storage', tableStorage);

// // Recognizer and and Dialog for preview QnAMaker service
// var previewRecognizer = new builder_cognitiveservices.QnAMakerRecognizer({
//     knowledgeBaseId: process.env.QnAKnowledgebaseId,
//     authKey: process.env.QnAAuthKey || process.env.QnASubscriptionKey
// });

// var basicQnAMakerPreviewDialog = new builder_cognitiveservices.QnAMakerDialog({
//     recognizers: [previewRecognizer],
//     defaultMessage: 'No match! Try changing the query terms!',
//     qnaThreshold: 0.3
// }
// );

// bot.dialog('basicQnAMakerPreviewDialog', basicQnAMakerPreviewDialog);

// // Recognizer and and Dialog for GA QnAMaker service
// var recognizer = new builder_cognitiveservices.QnAMakerRecognizer({
//     knowledgeBaseId: process.env.QnAKnowledgebaseId,
//     authKey: process.env.QnAAuthKey || process.env.QnASubscriptionKey, // Backward compatibility with QnAMaker (Preview)
//     endpointHostName: process.env.QnAEndpointHostName
// });

// var basicQnAMakerDialog = new builder_cognitiveservices.QnAMakerDialog({
//     recognizers: [recognizer],
//     defaultMessage: 'No match! Try changing the query terms!',
//     qnaThreshold: 0.3
// }
// );

// bot.dialog('basicQnAMakerDialog', basicQnAMakerDialog);

// bot.dialog('/', //basicQnAMakerDialog);
//     [
//         function (session) {
//             var qnaKnowledgebaseId = process.env.QnAKnowledgebaseId;
//             var qnaAuthKey = process.env.QnAAuthKey || process.env.QnASubscriptionKey;
//             var endpointHostName = process.env.QnAEndpointHostName;

//             // QnA Subscription Key and KnowledgeBase Id null verification
//             if ((qnaAuthKey == null || qnaAuthKey == '') || (qnaKnowledgebaseId == null || qnaKnowledgebaseId == ''))
//                 session.send('Please set QnAKnowledgebaseId, QnAAuthKey and QnAEndpointHostName (if applicable) in App Settings. Learn how to get them at https://aka.ms/qnaabssetup.');
//             else {
//                 if (endpointHostName == null || endpointHostName == '')
//                     // Replace with Preview QnAMakerDialog service
//                     session.replaceDialog('basicQnAMakerPreviewDialog');
//                 else
//                     // Replace with GA QnAMakerDialog service
//                     session.replaceDialog('basicQnAMakerDialog');
//             }
//         }
//     ]);
