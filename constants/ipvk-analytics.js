'use strict'

module.exports = {
  questions: {
    start: {
      q: [
        'Welcome, this chatbot is built to test your skills \nand understanding of Pinnacle Division. ',
        'do you want to try?'
      ].join(''),
      check: input => !!input.toLowerCase().match('yes')
    },
    division: {
      q: 'what division are you in?'
    },
    boss:{
      q: 'who is Ammar Maarif Prasetyo?',
      check: input => !!input.toLowerCase().match('the gokil boss')
    },
    product:{
      q: 'what is the MAIN PRODUCT iPin is selling? ',
      check: input => ['google analytics', 'ga'].indexOf(input.toLowerCase()) > -1
    },
    ace:{
      q:'who is the ace of pinnacle?',
      check: input => !!input.toLowerCase().match('the marvelous nanang riyadi') || !!input.toLowerCase().includes('nanang riyadi')
    },
    goTo:{
      q:'do you want to test on our general?',
      check: input => !!input.toLowerCase().match('yes')
    }
  },
  missBoss:'unfortunately he is the `the gokil boss`',
  finish:'this is it, thankyou for testing the bot please check `general` for another test',
  missproduct: 'pinnacle main product is google analytics',
  missace: 'He is from the RIYADI family. NANANG RIYADI',
  quit:'please try the bot when you are free'
}
