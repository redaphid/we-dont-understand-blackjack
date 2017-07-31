const blackjack = require('engine-blackjack')
const strategy  = require('blackjack-strategy')
const _         = require('lodash')
const actions   = blackjack.actions
const Game      = blackjack.Game
const debug     = require('debug')('blackjack')
function playTheGame() {
  const game = new Game()
  var offerInsurance = true

  game.dispatch(actions.deal())

  function getHandCount(gameState) {
    if(!_.isEmpty(gameState.handInfo.left))
      return 2

    return 1
  }

  function gameStateToStrategy(gameState) {
    var side = 'right'
    if(gameState.stage === 'player-turn-left')
      side = 'left'

    return [
        _.map(gameState.handInfo[side].cards, 'value'),
        gameState.dealerCards[0].value,
        getHandCount(gameState),
        false,
        {offerInsurance, maxSplitHands: 2}
      ]
  }

  function performAction(action) {
    debug(action)
    if(action === 'noinsurance') {
      offerInsurance = false
      return game.dispatch(actions.insurance(false))
    }

    debug(`${game.getState().stage} -> ${action}`)

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

    var strategyOptions = gameStateToStrategy(gameState)
    var action = strategy.GetRecommendedPlayerAction.apply(this, strategyOptions)
    performAction(action)
  }

  var gameState = game.getState()
  debug(JSON.stringify(_.omit(gameState, 'deck'), null, 2))
  return (gameState.wonOnRight + gameState.wonOnLeft) - gameState.finalBet
}
module.exports = playTheGame
