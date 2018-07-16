'use strict';
var builder = require('botbuilder');
var constants = require('../constants/ipvk-analytics.js');

var chatbase = require('@google/chatbase')
  .setApiKey('efd817c6-3222-400b-99be-2c27af44a215')
  .setUserId('iPIN1.1')
  .setPlatform('webChat')
  .setVersion('1.1')
  .setIntent('ipvkAnalytics1.1');



module.exports = [
  function (session) {
    // Prompt the user to confirm they would like to cross the gorge
    builder.Prompts.text(session, constants.questions.start.q);
  },

  function (session, results) {
    if (!constants.questions.start.check(results.response)) {
      // Apparently they don't so in Monty Python style send them on thier way
      chatbase.setAsTypeUser().newMessage()
        .setAsNotHandled()
        .setMessage(results.response.toString())
        .send()
        .catch(e => console.error(e));
      // End the dialog to open a new session on the console
      session.endConversation();
    } else {
      // Otherwise they chose to proceed, prompt them with the first question:
      // "What is your name?"
      chatbase.setAsTypeUser().newMessage()
        .setMessage(results.response.toString())
        .send()
        .catch(e => console.error(e));
      builder.Prompts.text(session, constants.questions.division.q);
      
    }
  },

  //ask for boss
  function (session, results) {
    chatbase.setAsTypeAgent().newMessage()
      .setMessage(results.response.toString())
      .send()
      .catch(e => console.error(e));

    builder.Prompts.text(session, constants.questions.boss.q);

  },

  function (session, results) {
    var question = constants.questions.boss;
    var answer = results.response.toString().trim();
    var userMsg = chatbase.setAsTypeUser().newMessage();
    var agentMsg = chatbase.setAsTypeAgent().newMessage();
    var correct = question.check(answer);
    
    agentMsg.setMessage(question.q.toString());
    userMsg.setMessage(answer);

    if (!correct) {
      session.send(constants.missBoss);
    }
      agentMsg.send().catch(e => console.error(e));           
      userMsg.send().catch(e => console.error(e));           
    
    //ask for product
    builder.Prompts.text(session, constants.questions.product.q);
  },

  function (session, results) {
    var question = constants.questions.product;
    var answer = results.response.toString().trim();
    var userMsg = chatbase.setAsTypeUser().newMessage();
    var agentMsg = chatbase.setAsTypeAgent().newMessage();
    var correct = question.check(answer);

    agentMsg.setMessage(question.q.toString());
    userMsg.setMessage(answer);

    if (!correct) {
      session.send(constants.missproduct);
    }
      agentMsg.send().catch(e => console.error(e));
      userMsg.send().catch(e => console.error(e));
        
    //ask for ace
    builder.Prompts.text(session, constants.questions.ace.q);
  },

  function (session, results) {
    var question = constants.questions.ace;
    var answer = results.response.toString().trim();
    var userMsg = chatbase.setAsTypeUser().newMessage();
    var agentMsg = chatbase.setAsTypeAgent().newMessage();
    var correct = question.check(answer);

    agentMsg.setMessage(question.q.toString());
    userMsg.setMessage(answer);

    agentMsg.send().catch(e => console.error(e));
    
    if (!correct) {
      session.send(constants.missace);
      userMsg.send().catch(e => console.error(e));
    } else {
      session.send('it seems that you have some idea who our pinnacle ace is');
      userMsg.send().catch(e => console.error(e));
    }
    
    builder.Prompts.text(session,constants.questions.goTo.q);
    
  },
  
  function(session,results){
    var question = constants.questions.goTo;
    var answer = results.response.toString().trim();
    var userMsg = chatbase.newMessage();
    var agentMsg = chatbase.setAsTypeAgent().newMessage();
    var correct = question.check(answer);

    agentMsg.setMessage(question.q.toString());
    userMsg.setMessage(answer);
    
    if(correct){
      session.beginDialog('/ipvk')
    }else{
      session.endConversation()
    }
  }
];
