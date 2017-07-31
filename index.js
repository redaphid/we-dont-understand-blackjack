_           = require('lodash')
playTheGame = require('./play-the-game')
const times = 10

function manySmallTimes() {
  return _.times(times, playTheGame)
}

const singleBetters = _.map(_.times(1000, playTheGame), (result) => result >= 10)

console.log(singleBetters)
