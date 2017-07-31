_           = require('lodash')
playTheGame = require('./play-the-game')
const NUMBER_OF_BETTERS = 1000
const SMALL_TIMES = 100

function manySmallTimes() {
  return _.mean(_.times(SMALL_TIMES, playTheGame))
}

function getWinners(strategy) {
  const results = _.times(NUMBER_OF_BETTERS, strategy)
  // console.log(results)
  return _.filter(results, (winnings) => winnings >= 0).length
}

const singleBetters = getWinners(playTheGame)
const multiBetters = getWinners(manySmallTimes)

console.log(`Single Betters that won: ${singleBetters}`)
console.log(`Multiple Betters that won: ${multiBetters}`)
