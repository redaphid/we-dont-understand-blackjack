const blackjack = require('engine-blackjack')
const strategy = require('blackjack-strategy')
const _ = require('lodash')
const actions = blackjack.actions
const Game = blackjack.Game
function gameStateToStrategy(gameState) {
  return [
      _.map(gameState.handInfo.right.cards, 'value'),
      gameState.dealerCards[0].value,
      1,
      false,
      null
    ]
}

const game = new Game()
game.dispatch(actions.deal())
var gameState = game.getState()
console.log(JSON.stringify(_.omit(gameState, 'deck'), null, 2))

var strategyOptions = gameStateToStrategy(gameState)
console.log(strategyOptions)
console.log(strategy.GetRecommendedPlayerAction.apply(this, strategyOptions))
