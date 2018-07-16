'use strict';
var builder = require('botbuilder');
var constants = require('../constants/ipvk-general.js');

var chatbase = require('@google/chatbase')
    .setApiKey('efd817c6-3222-400b-99be-2c27af44a215')
    .setUserId('iPIN1.1')
    .setPlatform('webChat')
    .setAsTypeUser()
    .setVersion('1.1')
    .setIntent('ipvkGeneral1.1');
    
module.exports = [
  function (session) {
    // Prompt the user to confirm they would like to cross the gorge
    builder.Prompts.text(session, constants.questions.start.q);
  },

  function (session, results) {
    if (!constants.questions.start.check(results.response)) {
      // Apparently they don't so in Monty Python style send them on thier way
      chatbase.newMessage()
        .setAsNotHandled()
        .setMessage(results.response.toString())
        .send()
        .catch(e => console.error(e));
      // End the dialog to open a new session on the console
      session.send(constants.finish);
      session.endConversation();
    } else {
      // Otherwise they chose to proceed, prompt them with the first question:
      // "What is your name?"
      chatbase.newMessage()
        .setMessage(results.response.toString())
        .send()
        .catch(e => console.error(e));
      builder.Prompts.text(session, constants.questions.division.q);
    }
  },

  //ask for boss
  function (session, results) {
    chatbase.newMessage()
      .setMessage(results.response.toString())
      .send()
      .catch(e => console.error(e));
    builder.Prompts.text(session, constants.questions.boss.q);
  },

  function (session, results) {
    var question = constants.questions.boss;
    var answer = results.response.toString().trim();
    var msg = chatbase.newMessage();
    var correct = question.check(answer);

    msg.setMessage(JSON.stringify({
      question: question.q,
      answer: answer,
      correct: correct
    }));

    if (!correct) {
      session.send(constants.missBoss);
      msg.send().catch(e => console.error(e));
    }
           
    //ask for chairman
    builder.Prompts.text(session, constants.questions.chairman.q);
  },

  //ask for prettiest
  function (session, results) {
    var question = constants.questions.chairman;
    var answer = results.response.toString().trim();
    var msg = chatbase.newMessage();
    var correct = question.check(answer);

    msg.setMessage(JSON.stringify({
      question: question.q,
      answer: answer,
      correct: correct
    }));

    if (!correct) {
      session.send(constants.missChairman);
      msg.send().catch(e => console.error(e));
    }
    builder.Prompts.text(session, constants.questions.prettiest.q);
  },

  function (session, results) {
    var question = constants.questions.prettiest;
    var answer = results.response.toString().trim();
    var msg = chatbase.newMessage();
    var correct = question.check(answer);

    msg.setMessage(JSON.stringify({
      question: question.q,
      answer: answer,
      correct: correct
    }));

    if (!correct) {
      session.send(constants.missPrettiest);
      msg.send().catch(e => console.error(e));
    } else {
      session.send('it seems that you have no preferrences');
      msg.send().catch(e => console.error(e));
    }
    session.send(constants.finish);
    session.endConversation();
  }
];
