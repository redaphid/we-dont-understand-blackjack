_           = require('lodash')
playTheGame = require('./play-the-game')
const numberOfBetters = 10000
function manySmallTimes() {
  return _.times(10, playTheGame)
}

const singleBetters = _.filter(_.map(_.times(numberOfBetters, playTheGame), (result) => result >= 10))

console.log(`Single Betters that won: ${singleBetters.length}`)
