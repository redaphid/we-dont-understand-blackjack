_           = require('lodash')
playTheGame = require('./play-the-game')
const numberOfBetters = 1000

function manySmallTimes() {
  return _.mean(_.times(10, playTheGame))
}

function getWinners(strategy) {
  return _.filter(_.times(numberOfBetters, strategy)).length
}

const singleBetters = getWinners(playTheGame)
const multiBetters = getWinners(manySmallTimes)

console.log(`Single Betters that won: ${singleBetters}`)
console.log(`Multiple Betters that won: ${multiBetters}`)
