'use strict'

module.exports = {
  questions: {
    start: {
      q: [
        'Welcome, this chatbot is built to test your skills \nand understanding our company. ',
        'do you want to try?'
      ].join(''),
      check: input => !!input.toLowerCase().match('yes')
    },
    division: {
      q: 'what division are you in?'
    },
    boss:{
      q: 'who is the ceo of iPVK?',
      check: input => !!input.toLowerCase().match('the infamous rahul nambiar')
    },
    prettiest:{
      q: 'mirror mirror mirror on the bot \nwho is the prettiest of us all?',
      check: input => !!input.toLowerCase().match('none')
    },
    chairman:{
      q:'who is the chairman of IPVK?',
      check: input => !!input.toLowerCase().match('sir cleo')
    }
  },
  missBoss:'unfortunately he is the `the infamous rahul nambiar`',
  finish:'this is it, thankyou for testing the bot. please check `analytics` to test the other bot',
  missPrettiest: 'ciaah... naksir ya loo? (this will be recorded in the server) :)',
  missChairman: 'seriously? the chairman of iPVK is `sir cleo` please keep that in mind if you do not want to have your salary cut',
  quit:'please try the bot when you are free'
}
