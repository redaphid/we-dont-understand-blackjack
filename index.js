_           = require('lodash')
playTheGame = require('./play-the-game')

const budget = 10
const smallBetValue = 2
const results = _.times(10, playTheGame)
console.log(results)
