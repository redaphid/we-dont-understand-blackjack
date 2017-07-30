const blackjack = require('engine-blackjack')
const strategy  = require('blackjack-strategy')
const _         = require('lodash')
const actions   = blackjack.actions
const Game      = blackjack.Game

const game = new Game()
game.dispatch(actions.deal())

function gameStateToStrategy(gameState) {
  return [
      _.map(gameState.handInfo.right.cards, 'value'),
      gameState.dealerCards[0].value,
      1,
      false,
      {offerInsurance: false}
    ]
}

var gameState = game.getState()
while(gameState.stage !== 'done') {
  var gameState = game.getState()
  console.log(JSON.stringify(_.omit(gameState, 'deck'), null, 2))

  var strategyOptions = gameStateToStrategy(gameState)
  var action = strategy.GetRecommendedPlayerAction.apply(this, strategyOptions)
  console.log(action)
  game.dispatch(actions[action](0))
  console.log("NEW ROUND!!!!!!")
}

var gameState = game.getState()
console.log(JSON.stringify(_.omit(gameState, 'deck'), null, 2))
