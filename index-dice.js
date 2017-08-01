_     = require('lodash')
Table = require('easy-table')
dice  = require('./dice')

const NUMBER_OF_BETTERS = 1000
const SMALL_TIMES = 10000

function singleBigTime() {
  return dice() * SMALL_TIMES
}

function manySmallTimes() {
  return _.sumBy(_.times(SMALL_TIMES, dice))
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

_.times(10, function(){
  const singleResults = getResults(singleBigTime)
  const multipleResults = getResults(manySmallTimes)

  console.log(Table.print([{
    name: 'Single Bet',
    percentage: getWinnersPercentage(singleResults),
    // winnings: getWinnings(singleResults),
    numTies: _.size(_.filter(singleResults, result => result == 0)),
    // results: JSON.stringify(_.sortBy(singleResults)),
  },{
    name: 'Multiple Bet',
    percentage: getWinnersPercentage(multipleResults),
    // winnings: getWinnings(multipleResults),
    numTies: _.size(_.filter(multipleResults, result => result == 0)),
    // results: JSON.stringify(_.sortBy(multipleResults)),
  }]))
})
