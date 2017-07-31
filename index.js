_           = require('lodash')
playTheGame = require('./play-the-game')
const NUMBER_OF_BETTERS = 100
const SMALL_TIMES = 10

function manySmallTimes() {
  return _.mean(_.times(SMALL_TIMES, playTheGame))
}

function getWinners(strategy) {
  return _.filter(_.times(NUMBER_OF_BETTERS, strategy), (winnings) => winnings > 0).length
}

const singleBetters = getWinners(playTheGame)
const multiBetters = getWinners(manySmallTimes)

console.log(`Single Betters that won: ${singleBetters}`)
console.log(`Multiple Betters that won: ${multiBetters}`)
