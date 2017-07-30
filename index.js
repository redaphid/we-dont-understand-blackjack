const blackjack = require('engine-blackjack')
const actions = blackjack.actions
const Game = blackjack.Game

const game = new Game()
console.log(JSON.stringify(game.getState(), null, 2))

game.dispatch(actions.deal())


console.log(JSON.stringify(game.getState(), null, 2))
