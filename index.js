_           = require('lodash')
playTheGame = require('./play-the-game')
const NUMBER_OF_BETTERS = 10000
const SMALL_TIMES = 10

function manySmallTimes() {
  const winnings = _.mean(_.times(SMALL_TIMES, playTheGame))
  return winnings
}

function getWinners(strategy) {
  const results = _.times(NUMBER_OF_BETTERS, strategy)
  return _.filter(results, (winnings) => winnings > 0).length
}

const singleBetters = getWinners(playTheGame)
const multipleBetters = getWinners(manySmallTimes)

console.log(`Single Bet Wins: ${singleBetters/NUMBER_OF_BETTERS * 100}%`)
console.log(`Multiple Bet Wins: ${multipleBetters/NUMBER_OF_BETTERS * 100}%`)
