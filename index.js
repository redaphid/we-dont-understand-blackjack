_           = require('lodash')
Table       = require('easy-table')
playTheGame = require('./play-the-game')

const NUMBER_OF_BETTERS = 10000
const SMALL_TIMES = 10

function manySmallTimes() {
  const winnings = _.mean(_.times(SMALL_TIMES, playTheGame))
  return winnings
}
function getResults(strategy) {
  return _.times(NUMBER_OF_BETTERS, strategy)
}

function getWinnersPercentage(results) {
  return 100 * _.filter(results, (winnings) => winnings > 0).length / _.size(results)
}

function getWinnings(results) {
  return _.sumBy(results)
}

const singleResults = getResults(playTheGame)
const multipleResults = getResults(manySmallTimes)

console.log(Table.print([{
  name: 'Single Bet',
  percentage: getWinnersPercentage(singleResults),
  winnings: getWinnings(singleResults),
},{
  name: 'Multiple Bet',
  percentage: getWinnersPercentage(multipleResults),
  winnings: getWinnings(multipleResults),
}]))
