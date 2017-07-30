const blackjack = require('engine-blackjack')
const strategy  = require('blackjack-strategy')
const _         = require('lodash')
const actions   = blackjack.actions
const Game      = blackjack.Game

function playTheGame() {
  const game = new Game()
  var offerInsurance = true

  game.dispatch(actions.deal())

  function gameStateToStrategy(gameState) {
    return [
        _.map(gameState.handInfo.right.cards, 'value'),
        gameState.dealerCards[0].value,
        1,
        false,
        {offerInsurance}
      ]
  }

  function performAction(action) {
    console.log(action)
    if(action === 'noinsurance') {
      offerInsurance = false
      return game.dispatch(actions.insurance(false))
    }
    console.log(_.keys(actions))
    console.log(actions[action])
    return game.dispatch(actions[action](0))
  }

  var gameState = game.getState()
  while(gameState.stage !== 'done') {
    var gameState = game.getState()
    console.log(JSON.stringify(_.omit(gameState, 'deck'), null, 2))

    var strategyOptions = gameStateToStrategy(gameState)
    var action = strategy.GetRecommendedPlayerAction.apply(this, strategyOptions)
    performAction(action)
  }

  var gameState = game.getState()
  console.log(JSON.stringify(_.omit(gameState, 'deck'), null, 2))
  return gameState.wonOnRight
}
module.exports = playTheGame
