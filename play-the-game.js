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

    console.log(`${game.getState().stage} -> ${action}`)

    if(game.getState().stage === 'player-turn-left')
      return game.dispatch(actions[action]({position: 'left'}))

    game.dispatch(actions[action]({position: 'right'}))
  }

  var gameState = game.getState()
  var iterations = 0
  while(gameState.stage !== 'done') {
    iterations++
    var gameState = game.getState()
    if(iterations > 10){
      console.log(JSON.stringify(_.omit(gameState, 'deck'), null, 2))
      throw new Error('We fucked up')
    }
    // console.log(JSON.stringify(_.omit(gameState, 'deck'), null, 2))

    var strategyOptions = gameStateToStrategy(gameState)
    var action = strategy.GetRecommendedPlayerAction.apply(this, strategyOptions)
    performAction(action)
  }

  var gameState = game.getState()
  return gameState.wonOnRight
}
module.exports = playTheGame
